// A simple serverless function to fetch weather data from OpenWeatherMap
module.exports = async (req, res) => {
    // API key ko environment variable mein store karna best practice hai
    const apiKey = process.env.ed5bd6186119c8803bdeb6930f5ddae0; 

    const { lat, lon } = req.query;

    if (!lat || !lon) {
        return res.status(400).send('Latitude and longitude are required.');
    }

    const apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric`;

    try {
        const response = await fetch(apiUrl);
        if (!response.ok) {
            throw new Error(`Error fetching data: ${response.statusText}`);
        }
        const data = await response.json();
        res.status(200).json(data);
    } catch (error) {
        console.error('API call error:', error);
        res.status(500).send('Failed to fetch weather data.');
    }
};