import axios from "axios";

export const getDogs = async (req, res) => {
  const response = await axios.get(
    "http://localhost:3000/api/animals/dogs",
    {
      headers: {
        "x-api-key": process.env.ADMIN_API_KEY
      },
      params: req.query 
    }
  );

  res.json({
    source: "user_backend",
    data: response.data
  });
};


export const getCats = async (req, res) => {
  const response = await axios.get(
    "http://localhost:3000/api/animals/cats",
    {
      headers: {
        "x-api-key": process.env.ADMIN_API_KEY
      },
      params: req.query
    }
  );

  res.json({
    source: "user_backend",
    data: response.data
  });
};

