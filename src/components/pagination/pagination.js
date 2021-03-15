import React, { useState } from "react";
import "./pagination.css";

export const Pagination = ({ count, setPageNumber }) => {
  const totalNumberOfPages = Math.round(count / 7);
  const [selectedIndex, setSelectedIndex] = useState(0);
  
  const [pagesNumberList, setpagesNumberList] = useState([
    { page: 1, selected: true },
    { page: 2, selected: false },
    { page: "", selected: false },
    { page: 3, selected: false },
    { page: 4, selected: false },
    { page: 5, selected: false },
    { page: 6, selected: false },
    { page: "...", selected: false },
    { page: totalNumberOfPages - 2, selected: false },
    { page: totalNumberOfPages - 1, selected: false },
  ]);

  const setSelection = (pageNo) => {
    pagesNumberList[2].page = "...";
    pagesNumberList[3].page = pageNo - 1;
    pagesNumberList[4].page = pageNo;
    pagesNumberList[5].page = pageNo + 1;
    pagesNumberList[6].page = pageNo + 2;
  };

  const reverseThePageList = () => {
    setpagesNumberList([
      { page: 1, selected: false },
      { page: 2, selected: false },
      { page: "", selected: false },
      { page: 3, selected: false },
      { page: 4, selected: false },
      { page: 5, selected: true },
      { page: 6, selected: false },
      { page: "...", selected: false },
      { page: totalNumberOfPages - 2, selected: false },
      { page: totalNumberOfPages - 1, selected: false },
    ])
    setSelection(5);
  };
  
  const onPageNoClick = (pageNo, pageIndex) => {
    pagesNumberList[selectedIndex].selected = false;
    if (pageNo > 5) {
      setSelection(pageNo);
      setSelectedIndex(4);
      pagesNumberList[4].selected = true;
      setpagesNumberList(pagesNumberList);
    } else {
      if(pageNo < 3 && pagesNumberList[2].page) {
        setSelection(4);
      } else if(pageNo == 5 && pagesNumberList[2].page) {
        reverseThePageList();
        setSelection(4);
      }
      pagesNumberList[pageIndex].selected = true;
      setSelectedIndex(pageIndex);
      setpagesNumberList(pagesNumberList);
    }
    setPageNumber(pageNo);
  };

  const onPrevOrNextClick = (previousSelected = false) => {
    if (
      (selectedIndex && previousSelected) ||
      (!previousSelected && selectedIndex !== 9)
    ) {
      let index = previousSelected ? selectedIndex - 1 : selectedIndex + 1;
      if(index == 2 && !pagesNumberList[2].page) {
        index = previousSelected ? selectedIndex - 2 : selectedIndex + 2;
      }
      if (pagesNumberList[index].page > 5) {
        pagesNumberList[5].selected = false;
        setSelection(pagesNumberList[previousSelected ? index - 1 : 5].page);
        pagesNumberList[4].selected = true;
        setpagesNumberList(pagesNumberList);
        setPageNumber(pagesNumberList[4].page);
      } else {
        if(pagesNumberList[index].page == 5 && pagesNumberList[2].page) {
          reverseThePageList();
        } else {
          pagesNumberList[index].selected = true;
          pagesNumberList[selectedIndex].selected = false;
          setSelectedIndex(index);
          setpagesNumberList(pagesNumberList);
        }
        setPageNumber(pagesNumberList[index].page);
      }
    }
  };

  return (
    <ul className="pagination">
      <li onClick={() => onPrevOrNextClick(true)}>
        <a className="prev">
          {" "}
          Prev
        </a>
      </li>
      {pagesNumberList &&
        pagesNumberList.map((value, index) => {
          if (value.page != "") {
            return (
              <li
                key={index}
                className={value.selected ? "pageNumber active" : "pageNumber"}
                onClick={() => value.page !== '...' && onPageNoClick(value.page, index)}
              >
                <a>{value.page}</a>
              </li>
            );
          }
        })}
      <li>
        <a className="next" onClick={() => onPrevOrNextClick()}>
          Next{" "}
        </a>
      </li>
    </ul>
  );
};
