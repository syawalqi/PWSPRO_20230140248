import axios from "axios";

/**
 * Apply query filters
 */
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
  try {
    const limit = Number(req.query.limit) || 10;
    const offset = Number(req.query.offset) || 0;

    const response = await axios.get(
      "https://www.exercisedb.dev/api/v1/exercises",
      {
        params: { limit, offset }
      }
    );

    const processed = response.data.data.map(item => ({
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

    res.json({
      count: filtered.length,               // items returned now
      total: response.data.metadata.totalExercises, // total dataset
      pagination: {
        limit,
        offset,
        current_page: response.data.metadata.currentPage,
        total_pages: response.data.metadata.totalPages,
        next_page: response.data.metadata.nextPage
      },
      data: filtered
    });
  } catch (error) {
    res.status(500).json({
      message: "Failed to fetch exercise data"
    });
  }
};
