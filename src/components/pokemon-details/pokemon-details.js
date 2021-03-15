import React, { useEffect, useState } from "react";
import axios from "axios";
import "./pokemon-deatil.css";
import { titlecase } from "../../service/common.utils";
// import { useParams } from "react-router-dom";

export const PokemonDetails = (props) => {
  const [card_details, setcard_details] = useState({});

  useEffect(() => {
    let url = props.location.state.url_pokemon_details;
    axios
      .get(url)
      .then((res) => {
        if (res.status === 200) {
          setcard_details(res.data);
        } else {
          alert("resposne error");
        }
      })
      .catch((err) => console.log(err));
  }, []);

  return (
    <div className="container d-flex justify-content-center mt-5 mb-5">
      <div class="card" style={{ maxWidth: "40rem" }}>
        <div className="pokemon-detail-card-img">
          <img
            src={card_details?.sprites?.front_default}
            className="card-img-top"
            alt="..."
          />
        </div>

        <div className="card-body">
          <div className="card-title">
            <span className="ml-2 name">
              {card_details.name && titlecase(card_details.name)}
            </span>
          </div>

          <div className="card-title">
            <span> Height</span>
            <span className="ml-2">:</span>
            <span className="ml-2">{card_details.height}</span>
          </div>

          <div className="card-title">
            <span> Weight</span>
            <span className="ml-2">:</span>
            <span className="ml-2">{card_details.weight}</span>
          </div>

          <div className="card-title d-flex">
            <span>Abilities</span>
            <span className="ml-2">:</span>
            <span className="ml-2">
              {card_details.abilities &&
                card_details.abilities.map((item, index) => (
                  <span className="ml-1">
                    {titlecase(item.ability.name)}
                    {card_details.abilities.length == index + 1
                      ? "."
                      : card_details.abilities.length > 1
                      ? ","
                      : ""}
                  </span>
                ))}
            </span>
          </div>

          <div className="card-title d-flex">
            <span> Moves</span>
            <span className="ml-2">:</span>
            <span className="ml-2" style={{ wordBreak: "break-all" }}>
              {card_details.moves &&
                card_details.moves.map((item, index) => (
                  <span className="ml-1">
                    {titlecase(item.move.name)}
                    {card_details.moves.length == index + 1
                      ? "."
                      : card_details.moves.length > 1
                      ? ","
                      : ""}
                  </span>
                ))}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};
