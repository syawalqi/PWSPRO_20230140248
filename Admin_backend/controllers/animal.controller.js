import axios from "axios";

const parseLifeSpan = (lifeSpan) => {
  if (!lifeSpan) return null;
  const nums = lifeSpan.match(/\d+/g)?.map(Number);
  if (!nums || nums.length < 2) return null;
  return {
    min: nums[0],
    max: nums[1],
    average: Math.round((nums[0] + nums[1]) / 2)
  };
};

const getSizeCategory = (weightMetric) => {
  if (!weightMetric) return "unknown";
  const nums = weightMetric.match(/\d+/g)?.map(Number);
  if (!nums || nums.length < 2) return "unknown";
  const avg = (nums[0] + nums[1]) / 2;
  if (avg < 10) return "small";
  if (avg < 25) return "medium";
  return "large";
};

const applyDogFilters = (dogs, query) => {
  let result = dogs;

  if (query.size) {
    result = result.filter(d => d.size_category === query.size);
  }

  if (query.min_lifespan) {
    const min = Number(query.min_lifespan);
    result = result.filter(d => d.lifespan?.average >= min);
  }

  return result;
};

const applyCatFilters = (cats, query) => {
  let result = cats;

  if (query.origin) {
    result = result.filter(
      c => c.origin?.toLowerCase() === query.origin.toLowerCase()
    );
  }

  if (query.min_lifespan) {
    const min = Number(query.min_lifespan);
    result = result.filter(c => c.lifespan?.average >= min);
  }

  return result;
};


export const getDogBreeds = async (req, res) => {
  try {
        const response = await axios.get(
      "https://api.thedogapi.com/v1/images/search",
      {
        params: {
          limit: 20,
          has_breeds: 1
        },
        headers: {
          "x-api-key": process.env.DOG_API_KEY
        }
      }
    );

    const processed = response.data.map(item => {
      const breed = item.breeds[0];

      return {
        breed_id: breed.id,
        breed_name: breed.name,
        species: "dog",
        lifespan: parseLifeSpan(breed.life_span),
        temperament: breed.temperament
          ? breed.temperament.split(",").map(t => t.trim())
          : [],
        size_category: getSizeCategory(breed.weight?.metric),
        image: item.url,
        source: "processed_vet_api"
      };
    });

    const filtered = applyDogFilters(processed, req.query);

    res.json({
      count: filtered.length,
      data: filtered
    });
  } catch (err) {
    res.status(500).json({ message: "Failed to fetch dog images" });
  }
};


export const getCatBreeds = async (req, res) => {
  try {
    const response = await axios.get(
      "https://api.thecatapi.com/v1/images/search",
      {
        params: {
          limit: 20,
          has_breeds: 1
        },
        headers: {
          "x-api-key": process.env.CAT_API_KEY
        }
      }
    );

    const processed = response.data.map(item => {
      const breed = item.breeds[0];

      return {
        breed_id: breed.id,
        breed_name: breed.name,
        species: "cat",
        lifespan: parseLifeSpan(breed.life_span),
        temperament: breed.temperament
          ? breed.temperament.split(",").map(t => t.trim())
          : [],
        origin: breed.origin || "unknown",
        image: item.url,
        source: "processed_vet_api"
      };
    });

    const filtered = applyCatFilters(processed, req.query);

    res.json({
      count: filtered.length,
      data: filtered
    });
  } catch (err) {
    res.status(500).json({ message: "Failed to fetch cat data" });
  }
};

