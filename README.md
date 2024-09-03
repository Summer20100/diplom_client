## API SERVER

https://diplom-server-post.onrender.com

## FOR CHEARS
#### GET ALL TYPES
https://diplom-server-post.onrender.com/api/chair
#### GET ONE BY ID
https://diplom-server-post.onrender.com/api/chair/:id

## FOR HALLS
#### POST HALL
https://diplom-server-post.onrender.com/api/hall  
In request body use  
{  
  "hall_title": "name_hall"  
}
#### GET ALL HALLS
https://diplom-server-post.onrender.com/api/hall
#### GET HALL BY ID
https://diplom-server-post.onrender.com/api/hall/:id
#### DELETE HALL BY ID
https://diplom-server-post.onrender.com/api/hall/:id

## FOR CHEARS OF HALLS
#### POST CAIRS OF HALL
https://diplom-server-post.onrender.com/api/hallchairs  
In request body use array:
[
  {
    "id_seat": id_seat,
    "hall_id": hall_id,
    "hall_title": "hall_title",
    "row_number": row_number,
    "seat_number": seat_number,
    "chair_type": "chair_type",
    "price": 500,
  }
]
#### GET ALL CHEARS HALLS
https://diplom-server-post.onrender.com/api/hallchairs
#### GET ALL CHEARS OF HALL BY ID
https://diplom-server-post.onrender.com/api/hallchairs/:id
#### UPDATE PRICE CHEARS OF HALL BY TYPES
https://diplom-server-post.onrender.com/api/hallchairs/:id  
Use id like req.params  
Use type like req.query  
Use price like req.body  
#### Example Request:  
To update the price of a hall chair with an ID of 82 and a type of vip:  
URL: https://diplom-server-post.onrender.com/api/hallchairs/82?type=vip  
Body: { "price": 150 }
#### DELETE CHEARS OF HALL BY ID
https://diplom-server-post.onrender.com/api/hallchairs/:id  
