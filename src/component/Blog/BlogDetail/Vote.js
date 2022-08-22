import axios from 'axios';
import React, { useState, useEffect } from 'react';
import StarRatings from 'react-star-ratings';
 
function Vote ({ idBlog, userData }) {
  const [rating, setRating] = useState(0);
  
  const url = "http://localhost:8080/laravel/laravel/public/api/blog/rate/" + idBlog
  const accessToken = userData.token
  let config = {
    headers: {
        'Authorization': 'Bearer ' + accessToken,
        'Content-Type': 'application/x-www-form-urlencoded',
        'Accept': 'application/json'
    }
};

  useEffect(() => {
    axios.get(url)
        .then( res => {
            const allRateInfor = res.data.data;
            console.log(allRateInfor)
            if (allRateInfor[0] !== undefined) {
              let sumRate = 0
              allRateInfor.map((oneRate) => {
                sumRate += oneRate.rate
              })
              setRating(sumRate/allRateInfor.length)
            }
            
        })
        .catch(error => console.log(error))
  },[])

  const changeRating = ( newRating ) => {
    
    const formData = new FormData ();
       formData.append('blog_id', idBlog);
       formData.append('user_id', userData.Auth.id);
       formData.append('rate', newRating);

    setRating(newRating)

    axios.post(url, formData, config)
    .then(res => {
      console.log(res.data)
    })
    .catch(error => console.log(error))

  }

    return (
        <StarRatings
          rating={rating}
          starRatedColor="blue"
          changeRating={changeRating}
          numberOfStars={5}
          name='rating'
        />
    )
}
 
 


export default Vote;
