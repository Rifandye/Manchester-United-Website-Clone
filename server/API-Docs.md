# MU Clone Api Docs

# Available Endpoints

- `POST` /add-user
- `POST` /login
- `POST` /google-login

- `GET` /pub/merchandises
- `GET` /pub/standings
- `GET` /pub/news

- `POST` /merchandises
- `GET` /merchandises
- `GET` /merchandises/:id
- `PUT` /merchandises/:id
- `DELETE` /merchandises/:id

- `POST` /categories
- `GET` /categories
- `GET` /categories/:id
- `DELETE` /categories/:id

## `POST` /add-user

This end point is used to add a new user

### Request

- body

```json
{
    "firstname": <string>,
    "lastname": <string>,
    "email": <string>,
    "password": <string>,
    "phoneNumber": <string>,
    "role": <string>
}
```

### Response

_201 - Created_

- body

```json
{
  "id": <integer>,
  "firstname": <string>,
  "lastname": <string>,
  "email": <string>,
  "role": <string>
}
```

_400 - BadRequest_

```json
{
  "message": "First Name is required"
}
```

OR

```json
{
  "message": "Last Name is required"
}
```

OR

```json
{
  "message": "Email is required"
}
```

OR

```json
{
  "message": "Password is required"
}
```

OR

```json
{
  "message": "Email already taken"
}
```

OR

```json
{
  "message": "Enter a valid email address"
}
```

_500 - InternalServerError_

```json
{
  "message": "Internal Server Error"
}
```

## `POST` /login

This end point is used for login

### Request

- body

```json
{
  "email": <string>,
  "password": <string>
}
```

### Response

_200 - Ok_

```json
{
    "access_token": <string>,
    "role": <string>
}
```

_400 -BadRequest_

```json
{
  "message": "Email cannot empty"
}
```

OR

```json
{
  "message": "Pasword cannot empty"
}
```

OR

```json
{
  "message": "Email/Invalid is invalid"
}
```

_500 - InternalServerError_

```json
{
  "message": "Internal Server Error"
}
```

## `GET` /pub/merchandises

### Request

- none

### Response

_200 - Ok_

```json
{
  "id": <string>,
  "name": <string>,
  "description": <string>,
  "imageUrl": <string>,
  "price": <integer>
}
```

_500 - InternalServerError_

```json
{
  "message": "Internal Server Error"
}
```

## `GET` /pub/standings

This end point is used to get the latest Premier League standing

### Request

- none

### Response

_200 - Ok_

```json
[
  [
    {
      "rank": <integer>,
      "team": {
        "id": <integer>,
        "name": <string>,
        "logo": <string>
      },
      "points": <integer>,
      "goalsDiff": <integer>,
      "group": <string>,
      "form": <string>,
      "status": <string>,
      "description": <string>,
      "all": {
        "played": <integer>,
        "win": <integer>,
        "draw": <integer>,
        "lose": <integer>,
        "goals": {
          "for": <integer>,
          "against": <integer>
        }
      },
      "home": {
        "played": <integer>,
        "win": <integer>,
        "draw": <integer>,
        "lose": <integer>,
        "goals": {
          "for": <integer>,
          "against": <integer>
        }
      },
      "away": {
        "played": <integer>,
        "win": <integer>,
        "draw": <integer>,
        "lose": <integer>,
        "goals": {
          "for": <integer>,
          "against": <integer>
        }
      },
      "update": <string>
    }
    ...
  ]
]
```

_500 - InternalServerError_

```json
{
  "message": "Internal Server Error"
}
```

## `GET` /pub/news

This end point is used to get the latest football news

### Request

- none

### Response

```json
 {
        "url": <string>,
        "title": <string>,
        "news_img": <string>,
        "short_desc": <string>
    },
```

_500 - InternalServerError_

```json
{
  "message": "Internal Server Error"
}
```

## `POST` /merchandises

This end point is used to create a merchandise

### Request

- headers

```json
{
  "Authorization": "Bearer <token>"
}
```

- body

```json
{
  "name": <string>,
  "description": <string>,
  "imageUrl": <string>,
  "price": <integer>,
  "CategoryId": <integer>
}
```

### Response

_201 - Created_

```json
{
  "id": <integer>,
  "name": <stirng>,
  "description": <stirng>,
  "imageUrl": <stirng>,
  "price": <integer>,
  "Catalogues": [
    {
      "id": <integer>,
      "MerchandiseId": <integer>,
      "CategoryId": <integer>,
      "Category": {
        "id": <integer>,
        "name": <stirng>
      }
    }
  ]
}
```

_401 - Unauthorized_

```json
{
  "message": "Invalid Token"
}
```

_500 - InternalServerError_

```json
{
  "message": "Internal Server Error"
}
```

## `GET` /merchandises

This end point is used to get all merchandise data

### Request

- headers

```json
{
  "Authorization": "Bearer <token>"
}
```

### Response

_200 - Ok_

```json
{
  "id": <integer>,
  "name": <string>,
  "description": <string>,
  "imageUrl": <string>,
  "price": <integer>,
}
```

_500 - InternalServerError_

```json
{
  "message": "Internal Server Error"
}
```

## `GET` /merchandises/:id

This end point is used to get a merchandise by id

### Request

- headers

```json
{
  "Authorization": "Bearer <token>"
}
```

### Response

_200 - Ok_

```json
{
  "id": <integer>,
  "name": <string>,
  "description": <string>,
  "imageUrl": <string>,
  "price": <integer>
}
```

_500 - InternalServerError_

```json
{
  "message": "Internal Server Error"
}
```

## `PUT` /merchandises/:id

This end point is used to update a merchandise by id

### Request

- headers

```json
{
  "Authorization": "Bearer <token>"
}
```

- body

```json
{
  "name": <string>,
  "description": <string>,
  "imageUrl": <string>,
  "price": <integer>,
  "categoryId": <integer>
}
```

### Response

_200 - Ok_

```json
{
  "name": <string>,
  "description": <string>,
  "imageUrl": <string>,
  "price": <integer>,
  "createdAt": <string>,
  "updatedAt": <string>
}
```

_404 - Not Found_

```json
{
  "message": "Merchandise not found"
}
```

_500 - InternalServerError_

```json
{
  "message": "Internal Server Error"
}
```

## `DELETE` /merchandises/:id

This end point is used to delete a merchandise by its id

### Request

- headers

```json
{
  "Authorization": "Bearer <token>"
}
```

### Response

_200 - Ok_

```json
{
  "message": "A Merchandise has been deleted"
}
```

_404 - Not Found_

```json
{
  "message": "Merchandise not found"
}
```

_500 - InternalServerError_

```json
{
  "message": "Internal Server Error"
}
```

## `POST` /categories

This end point is used to create a category

### Request

- headers

```json
{
  "Authorization": "Bearer <token>"
}
```

- body

```json
{
  "name": <string>
}
```

### Response

_201 - Created_

```json
{
  "id": <integer>,
  "name": <string>,
  "updatedAt": <string>,
  "createdAt": <string>
}
```

_400 - Bad Request_

```json
{
  "message": "Name is required"
}
```

_500 - InternalServerError_

```json
{
  "message": "Internal Server Error"
}
```

## `GET` /categories

This end point to get all the categories

### Request

- headers

```json
{
  "Authorization": "Bearer <token>"
}
```

### Response

_200 - Ok_

```json
{
  "id": <integer>,
  "name": <string>
}
```

_500 - InternalServerError_

```json
{
  "message": "Internal Server Error"
}
```

## `GET` /categories/:id

This end point is to get a category by id

### Request

- headers

```json
{
  "Authorization": "Bearer <token>"
}
```

### Response

_200 - Ok_

```json
{
  "id": <integer>,
  "name": <string>,
  "createdAt": <string>,
  "updatedAt": <string>,
  "Catalogues": [
    {
      "id": <integer>,
      "MerchandiseId": <integer>,
      "CategoryId": <integer>,
      "createdAt": <string>,
      "updatedAt": <string>,
      "Merchandise": {
        "id": <integer>,
        "name": <string>,
        "description": <string>,
        "imageUrl": <string>,
        "price": <integer>,
        "createdAt": <string>,
        "updatedAt": <string>
      }
    }
  ]
}
```

_400 - Not Found_

```json
{
  "message": "Category not Not Found"
}
```

_500 - InternalServerError_

```json
{
  "message": "Internal Server Error"
}
```

## `DELETE` /categories/:id

This end point to delete a category by id

### Request

- headers

```json
{
  "Authorization": "Bearer <token>"
}
```

### Response

_200 - Ok_

```json
{
  "message": "The Category has been deleted"
}
```

_400 - Not Found_

```json
{
  "message": "Category not Not Found"
}
```

_500 - InternalServerError_

```json
{
  "message": "Internal Server Error"
}
```
