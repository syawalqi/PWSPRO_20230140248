import axios from "axios";

/**
 * Simple in-memory cache
 * key: "limit:offset"
 */
const cache = new Map();
const CACHE_TTL = 60 * 1000; // 60 seconds

const applyExerciseFilters = (exercises, query) => {
  let result = exercises;

  if (query.equipment) {
    result = result.filter(e =>
      e.equipment.includes(query.equipment.toLowerCase())
    );
  }

  if (query.body_part) {
    result = result.filter(e =>
      e.body_parts.includes(query.body_part.toLowerCase())
    );
  }

  if (query.muscle) {
    result = result.filter(e =>
      e.primary_muscles.includes(query.muscle.toLowerCase())
    );
  }

  return result;
};

export const getExercises = async (req, res) => {
  const limit = Math.min(Number(req.query.limit) || 10, 25);
  const offset = Number(req.query.offset) || 0;
  const cacheKey = `${limit}:${offset}`;

  try {
    // 🧠 SERVE FROM CACHE
    if (cache.has(cacheKey)) {
      const cached = cache.get(cacheKey);

      if (Date.now() - cached.timestamp < CACHE_TTL) {
        return res.json(cached.data);
      }

      cache.delete(cacheKey);
    }

    const response = await axios.get(
      "https://www.exercisedb.dev/api/v1/exercises",
      { params: { limit, offset } }
    );

    const { metadata, data } = response.data;

    const processed = data.map(item => ({
      exercise_id: item.exerciseId,
      exercise_name: item.name,
      equipment: item.equipments.map(e => e.toLowerCase()),
      primary_muscles: item.targetMuscles.map(m => m.toLowerCase()),
      secondary_muscles: item.secondaryMuscles.map(m => m.toLowerCase()),
      body_parts: item.bodyParts.map(b => b.toLowerCase()),
      media: {
        type: "gif",
        url: item.gifUrl
      },
      instructions: item.instructions,
      source: "processed_fitness_api"
    }));

    const filtered = applyExerciseFilters(processed, req.query);

    const result = {
      count: filtered.length,
      total: metadata.totalExercises,
      pagination: {
        limit,
        offset,
        current_page: metadata.currentPage,
        total_pages: metadata.totalPages,
        next_page: metadata.nextPage
      },
      data: filtered
    };

    // 💾 STORE IN CACHE
    cache.set(cacheKey, {
      timestamp: Date.now(),
      data: result
    });

    res.json(result);
  } catch (error) {
    // 🚦 HANDLE RATE LIMIT GRACEFULLY
    if (error.response?.status === 429) {
      return res.status(429).json({
        message: "Upstream API rate limit reached. Please wait a moment."
      });
    }

    console.error("Exercise API error:", error.message);
    res.status(500).json({ message: "Failed to fetch exercise data" });
  }
};
export const clearExerciseCache = (req, res) => {
  cache.clear();
  res.json({ message: "Exercise cache cleared" });
}