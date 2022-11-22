import { useTranslation } from "react-i18next";
// import { useGet, useMutate } from "hooks/query";
import { Link } from "react-router-dom";
import React, { useState } from "react";

import { checkAmount } from "../../services/helpers";
import Button from "../../components/Button";
import imageTrash from "../../assets/images/icon-trash.svg";
import { languageCombination } from "../../services/helpers";

import { ReactComponent as trash } from "../../assets/images/icon-trash.svg";

export const problemList = [
  {
    id: 2311468456,
    title: "Criminal case",
  },
];
const problem = [
  {
    id: "23d11468sa456",
    application_count: 3,
    created_at: 15685618,
    title: {
      us_en: "Notary",
      uz_lat: "Natrius",
      uz_uz: "Notarius",
    },
  },
];

const Index = () => {
  const [isCategoriesOpen, setIsCategoriesOpen] = useState(false);
  const { t, i18n } = useTranslation();
  const toggleCategory = () => {
    setIsCategoriesOpen((prev) => !prev);
  };

  const handleSelect = (id, e) => {
    if (category.length < 5 || !e.target.chacked) {
      if (category.includes(id)) {
        let filtered = category.filter((el) => el.id !== id);
        setCategory(filtered);
      } else {
        setCategory((initial) => [...initial, id]);
      }
    }
    // else {}
  };
  const [category, setCategory] = useState([]);
  return (
    <div>
      <section className="services">
        <div className="services__content container">
          <div className="services__titling">
            <h1 className="services__titling-title"> {t("services")} </h1>
            <div className="services__titling-action">
              <div className="services__categories">
                <button
                  className="services__btn services__categories-toggler"
                  onClick={toggleCategory}
                >
                  <p>{t("choose_cateogry")}</p>
                </button>
                <div
                  className={`services__categories-context ${
                    isCategoriesOpen && "opened"
                  }`}
                >
                  <h3 className="services__categories-title">
                    {t("choose_your_cateogry")}
                  </h3>
                  <ul className="services__categories-list">
                    {React.Children.toArray(
                      problemList.map((elem, ind) => (
                        <li className="services__categories-item">
                          <input
                            type="checkbox"
                            checked={category.includes(elem.id)}
                            id={"checkbox_" + ind}
                            className="services__categories-input"
                            onChange={(e) => handleSelect(elem.id, e)}
                          />
                          <label
                            className="services__categories-label"
                            htmlFor={"checkbox_" + ind}
                          >
                            <p className="services__categories-labeltxt">
                              {elem.title[languageCombination(i18n.language)]}
                            </p>
                            <span className="services__categories-labelcheck"></span>
                          </label>
                        </li>
                      ))
                    )}
                  </ul>
                  <div className="services__categories-action">
                    <Button
                      onClick={toggleCategory}
                      type="grey"
                      title={t("cancel")}
                    />
                    <Button title={t("save")} />
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="services__body">
            {problem.map((item, index) => (
              <Link
                to={`/case/${item.id}`}
                className="services__card"
                key={`${item.id}-${index}`}
              >
                <div>
                  <h2 className="services__card-title">
                    {item.title[languageCombination(i18n.language)]}
                    {/* {item.title(i18n.language)} */}
                    <span> {checkAmount(item.application_count)} </span>
                  </h2>
                </div>
                <p className="services__card-desc"> {item.desc} </p>
                <div
                  className="services__card-btn"
                  // onClick={(e) => handleDelete(e, item.id)}
                >
                  <img src={imageTrash} alt="" />
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default Index;
