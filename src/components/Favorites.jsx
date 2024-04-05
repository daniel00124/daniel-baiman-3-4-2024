import React from 'react'
import { useNavigate } from 'react-router-dom'
export default function Favorites(props) {
  const nav = useNavigate()
  const hendelChosenFavorite=(name)=>{
    props.handleSearch(name)
    nav("/")
  }
  return (
    <div id='favoritsPage'>
      <h1>favorits</h1>
      <div id='favoritesWrap'>
        {props.favoritesList.map((e,idx)=>{
              return <button id='favorite' key={idx} onClick={()=>hendelChosenFavorite(e.name)}>
                <div>
                <p id='favoriteP'>{e.name}</p>
                <p id='favoriteP'>{Math.floor(e.currentWrather)} C</p>
                <p>Id:{e.id}</p>
                </div>
              </button>
              })}
      </div>
    </div>
  )
}
