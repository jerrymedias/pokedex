import React, { useState, useEffect } from "react";
import "./pokemon-cards.css";
import { GetCards } from "../../service/api-services";
import { titlecase } from "../../service/common.utils";
import { Link } from "react-router-dom";
import { Pagination } from "../pagination/pagination";

export const PokemonCards = () => {
  const [card_data, setcardData] = useState();
  const [selectedPageNumber, setSelectedPageNumber] = useState(1);

  useEffect(() => {
    GetCards(
      selectedPageNumber > 1 ? selectedPageNumber * 7 : selectedPageNumber,
      7
    )
      .then((res) => {
        setcardData(res?.data);
      })
      .catch((err) => console.log(err));
  }, [selectedPageNumber]);

  const setPageNumber = (val) => {
    setSelectedPageNumber(val);
  };
  return (
    <>
      <div className="table-container container">
        <div className="row">
          <div className="col-sm-12">
            <div className="table-responsive">
              <table class="table table-striped">
                <thead>
                  <tr>
                    <th scope="col">SR No.</th>
                    <th scope="col">Name</th>
                    <th scope="col">Link</th>
                  </tr>
                </thead>
                <tbody>
                  {card_data &&
                    card_data.results.map((card, index) => {
                      return (
                        <tr key={index}>
                          <th>{index + 1}</th>
                          <td>{titlecase(card.name)}</td>
                          <td>
                            <button class="btn btn-primary get_details_button">
                              <Link
                                to={{
                                  pathname: `pokemon-detail`,
                                  state: {
                                    url_pokemon_details: card.url,
                                  },
                                }}
                                style={{ 
                                  textDecoration: "none",
                                  color: "#ffff",
                                  fontWeight: "600",
                                }}
                              >
                                Get Details
                              </Link>
                            </button>
                          </td>
                        </tr>
                      );
                    })}
                </tbody>
              </table>
            </div>
          </div>
        </div>
        <div className="row">
          <div className="col-sm-12">
            {" "}
            {card_data?.count && (
              <Pagination
                count={card_data?.count}
                setPageNumber={setPageNumber}
              />
            )}
          </div>
        </div>
      </div>
    </>
  );
};
