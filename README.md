# Wanderlust - Major Project (Airbnb Clone)

## Description
Wanderlust is a simplified clone of the Airbnb website built using Node.js, Express, MongoDB, EJS, and CSS. This project provides functionalities similar to Airbnb, allowing users to authenticate, list properties, and manage reviews.

## Features
- **User Authentication**: Users can sign up, log in, and log out securely.
- **Property Listings**: Displays a comprehensive list of properties, including details, location maps, and images.
- **User Interactions**: 
  - Users can create, edit, and delete property listings.
  - Users can create and delete reviews for properties.

## How to Use
To set up and run the project locally, follow these steps:

1. **Download the Project**:
   - Click the `CODE` button and download the zip file.

2. **Extract the Files**:
   - Right-click on the downloaded zip folder and select `Extract All`.

3. **Open the Project in VS Code**:
   - Open the extracted `MajorProject` folder in Visual Studio Code.

4. **Install Dependencies**:
   - Open the terminal in VS Code and run the following command to install all necessary packages:
     ```sh
     npm install
     ```

5. **Initialize Data**:
   - In the terminal, initialize the data by running:
     ```sh
     node init/index.js
     ```

6. **Run the Server**:
   - Start the server by running:
     ```sh
     node app.js
     ```

7. **Access the Application**:
   - Open your browser and navigate to `http://localhost:3000` to see the application in action.

## Technologies Used
- **Frontend**:
  - HTML
  - CSS
  - JavaScript
  - Bootstrap
  - EJS (Embedded JavaScript templates)
  
- **Backend**:
  - Node.js
  - Express.js
  
- **Database**:
  - MongoDB
  
- **Architecture**:
  - MVC (Model-View-Controller)

## Packages Used
- `mongoose-atlas`: MongoDB object modeling tool.
- `passport`: Authentication middleware for Node.js.
- `connect-flash`: Flash message middleware for Express.
- `express-session`: Session middleware for Express.
- `multer`: Middleware for handling `multipart/form-data`
- `cookie-parser`: Middleware for parsing cookies.
- `dotenv`: Loads environment variables from a `.env` file.
- `cloudinary`: Cloud service for managing images.

## Contributing
If you wish to contribute to this project, please follow these steps:
1. Fork the repository.
2. Create a new branch (`git checkout -b feature/YourFeature`).
3. Make your changes and commit them (`git commit -m 'Add some feature'`).
4. Push to the branch (`git push origin feature/YourFeature`).
5. Open a Pull Request.

## Project demo : 
link : https://wanderlust-1-rlwl.onrender.com/listings

