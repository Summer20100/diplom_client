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
#### POST CHEARS OF HALL
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
#### UPDATE TYPE OF CHEAR OF HALL BY NUMBER OF CHAIR
https://diplom-server-post.onrender.com/api/hallchairs/:id?seat="seat"  
Use id like req.params.id  
Use id_seat like req.query.id_seat  
Use chair_type like req.body.chair_type  
#### Example Request:  
To update the price of a hall chair with an ID of 82 and a type of vip:  
URL: https://diplom-server-post.onrender.com/api/hallchairs/82?seat=4  
Body: { "chair_type": "vip" }
#### UPDATE PRICE CHEARS OF HALL BY TYPES
https://diplom-server-post.onrender.com/api/hallchairs/:id?type="type"  
Use id like req.params.id  
Use type like req.query.type  
Use price like req.body.price  
#### Example Request:  
To update the price of a hall chair with an ID of 82 and a type of vip:  
URL: https://diplom-server-post.onrender.com/api/hallchairs/82?type=vip  
Body: { "price": 150 }
#### DELETE CHEARS OF HALL BY ID
https://diplom-server-post.onrender.com/api/hallchairs/:id  


## FOR SESSIONS
#### GET ALL SESSIONS
https://diplom-server-post.onrender.com/api/sessions  
#### GET SESSION BY ID SESSION
https://diplom-server-post.onrender.com/api/sessions/:id  
#### GET ALL SESSION BY ID HALL
https://diplom-server-post.onrender.com/api/sessions/hall/:id  
#### POST SESSION
https://diplom-server-post.onrender.com/api/sessions  
In request body use array:  
[  
  {  
    "hall_id": hall_id,  
    "hall_title": hall_title,  
    "session_date": session_date,  
    "session_start": session_start,  
    "session_finish": session_finish  
  }  
]  
#### UPDATE SESSION
https://diplom-server-post.onrender.com/api/session/:id  
Use id like req.params.id  
In request body use object:  
  {  
    "hall_id": hall_id,  
    "hall_title": hall_title,  
    "session_date": session_date,  
    "session_start": session_start,  
    "session_finish": session_finish  
  }  

#### DELETE SESSION BY ID SESSION
https://diplom-server-post.onrender.com/api/session/:id  
