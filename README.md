# Rocketium Node.js Dummy json Project

This project sets up a Node.js server that fetches dummy JSON data, stores it in MongoDB, and provides an API to access, filter, and sort this data

## Project Overview

This project demonstrates:
- Fetching external data and storing it in MongoDB
- Creating a RESTful API with Express
- Implementing data filtering and sorting
- Error handling and input validation


## Prerequisites

- Node.js 
- npm 
- MongoDB 


## Setup Instructions

Clone this repository
```bash
   git clone https://github.com/ruthwikchikoti/dummy-json_API.git
   cd dummy-json_API
```

Create a `.env` file in the root directory and add the following:

   - DATA_URL=<your_data_url_here>
   - PORT=3000
   - MONGO_URI=<your_mongodb_connection_string>

To install the dependencies for this project, you can run the following command:

```bash
npm install dotenv axios mongodb
```

This command will install the required packages: `dotenv`, `axios`, and `mongoose`.

 Initialize the database: `node initialize.js`
   
Start the server: `npm start`
   
   The server will start on http://localhost:3000
## Project Structure

- `app.js`: Main entry point, sets up the Express server
- `initialize.js`: Script to fetch and store the initial data in MongoDB
- `routes/dataRoute.js`: Defines API routes
- `controllers/dataController.js`: Handles route logic
- `services/dataService.js`: Manages data fetching from MongoDB
- `utils/dataUtils.js`: Contains utility functions for filtering and sorting
## Data Initialization

The project includes an initialization script that fetches the dummy JSON data and stores it in *MongoDB*. This script should be run before starting the server for the first time: `node initialize.js`



   * This will populate your MongoDB database with the initial data.



## API Usage

### GET /api/data

Retrieve the data with optional filtering and sorting.

# Query Parameters:
- **filter** (optional): Filter the data based on specific criteria.
  `Format: key1:value1,key2:value2`
  * **Example**: filter=language:Hindi

- **sort** (optional): Sort the data based on a specific field.
  `Format: field:order`
  * *Example*: sort=version:desc

## Error Responses
 - The API may return the following error responses:

    * 400 Bad Request: For invalid query parameters or formats
    * 500 Internal Server Error: For server-side issues

# Examples:
- *Get all data*: `/api/data`
     ```json
    [{
        "name": "Adeel Solangi",
        "language": "Sindhi",
        "id": "V59OF92YF627HFY0",
        "bio": "Donec lobortis eleifend condimentum. Cras dictum dolor lacinia lectus vehicula rutrum. Maecenas quis nisi nunc. Nam tristique feugiat est vitae mollis. Maecenas quis nisi nunc.",
        "version": 6.1
    }]
    ```
- *Filter data*: `/api/data?filter=language:Hindi`

    ```json
    [{ 
        "name": "Preeti Rajdan",
        "language": "Hindi",
        "id": "3UN0X88Y4WYH3X8X",
        "bio": "In sed ultricies lorem. Vivamus id faucibus velit, id posuere leo. Duis commodo orci ut dolor iaculis facilisis. Nam rutrum sollicitudin ante tempus consequat.",
        "version": 9.17
    }]
- *Sort data*: `/api/data?sort=version:desc`
    ```json
    [{
        "name": "Chetana Hegde",
        "language": "Hindi",
        "id": "J9GS1RODDZL325LK",
        "bio": "Aliquam sollicitudin ante ligula, eget malesuada nibh efficitur et. Nulla finibus massa at viverra facilisis. Nam tristique feugiat est vitae mollis. Phasellus tincidunt sollicitudin posuere.",
        "version": 9.99
    }]
- *Filter and sort*: `/api/data?filter=language:Hindi&sort=id:desc`
   ```json
   [{
    
        "name": "Ronak Gupta",
        "language": "Hindi",
        "id": "ZYPDGK8UDYJPTRKN",
        "bio": "Sed laoreet posuere sapien, ut feugiat nibh gravida at. Quisque mauris ligula, efficitur porttitor sodales ac, lacinia non ex. In sed ultricies lorem. Pellentesque massa sem, scelerisque sit amet odio id, cursus tempor urna.",
        "version": 7.18
   }]

## Note:
 Filtering is case-insensitive and uses partial matching. Sorting order can be 'asc' (ascending) or 'desc' (descending).


 ## Performance Optimizations

- Data is stored in MongoDB for efficient querying and scalability
- Filtering and sorting operations are performed at the database level for improved performance




 # Error Handling

   The API includes robust error handling for various scenarios:

- Unrecognized Query Parameters
- Invalid Filter Format
- No Matching Items
- Invalid Sort Format


- 1. Unrecognized Query Parameters
        * url : `URL: http://localhost:3000/api/data?sorted`

        * Response :

        ```json

        {
            "error": "Unrecognized query parameter(s)",
           "message": "Unrecognized query parameter(s): sorted"
        }
        ```


-  2. Invalid Filter Format:

         * url : `http://localhost:3000/api/data?filter=language`

         * Response 

         ```json
            { 
            "error": "Filter error",
            "message": "Filter error: Invalid filter format: language"
            }
        
-   3. No Matching Items :

        * url : `http://localhost:3000/api/data?filter=language=hinfi`

        * Response: 

        ```json
         {
            "error": "Filter error",
            "message": "Filter error: Invalid filter format: language=hinfi",
        }
        ```

-   4 . Invalid Sort Format:

    * url : `http://localhost:3000/api/data?sort=version:desc`

    * Response :

    ```json
    {
         "error": "Sort error",
          "message": "Sort error: Invalid sort format. Expected 'field:asc' or 'field:desc', got 'version:decs'"
    }
    ```

## Postman Collection
 
 ### Using Postman
To test the API using Postman:

- Open Postman and create a new request.
- Set the request type to GET.
- Enter the URL (e.g., http://localhost:3000/api/data).
- Add query parameters as needed (e.g., filter and sort).
-Send the request and view the response.

### Get all data

- *url* : `http://localhost:3000/api/data`

   * *output* ![Get all data](images/image.png)

### Filter data
- *url* :  `http://localhost:3000/api/data?filter=language:Hindi` 

   * *output*![Filter data](images/image-1.png)

### Sort data

- *url* : `http://localhost:3000/api/data?sort=version:desc`
  
    * *output* ![Sort data](images/image-2.png)

### Filter and sort

- *url* : `http://localhost:3000/api/data?filter=language:Hindi&sort=id:desc`

    * *output* ![Filter and sort](images/image-3.png)


## Errors

- *Invalid sort format*
  - *URL*: `http://localhost:3000/api/data?sort=version:decs`
  - *Response*: ![Invalid sort format](images/image-4.png)

- *No matching items*
  - *URL*: `http://localhost:3000/api/data?filter=language=hinfi`
  - *Response*: ![No matching items](images/image-5.png)

- *Invalid filter format*
  - *URL*: `http://localhost:3000/api/data?filter=language`
  - *Response*: ![Invalid filter format](images/image-6.png)

- *Unrecognized query parameters*
  - *URL*: `http://localhost:3000/api/data?sorted`
  - *Response*: ![Unrecognized query parameters](images/image-7.png)