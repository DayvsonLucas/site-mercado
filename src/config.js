const defaultSettings = {
    REACT_APP_BASE_URL: window.REACT_APP_API_URL
};
const settings = { defaultSettings, ...process.env };
export default settings;
