import mongoose, { Connection } from "mongoose";
import { envConfig } from "../dotenv/config"; // Assuming you have a config file with MongoDB connection details

const { DB_USER, DB_PASSWORD, DB_COLLECTION, PORT } = envConfig;

// Construct the MongoDB connection URL
const mongoURI = `mongodb+srv://${DB_USER}:${DB_PASSWORD}@cluster0.ybuq3gj.mongodb.net/${DB_COLLECTION}?retryWrites=true&w=majority`;

// Mongoose options
const mongooseOptions: mongoose.ConnectOptions = {};

// Connect to MongoDB
mongoose.connect(mongoURI, mongooseOptions);

// Get the default connection
const db: Connection = mongoose.connection;

export const connectDb = () => {
	// Event listeners for connection status
	db.on("error", console.error.bind(console, "MongoDB connection error:"));
	db.once("open", () => {
		console.log("Connected to MongoDB");
	});
};

// Export the mongoose instance for use in other parts of your application
export default mongoose;
