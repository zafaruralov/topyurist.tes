import React, { useState } from "react";
import { useTranslation } from "react-i18next";

// componenets
import Titling from "../../components/Titling";
import CustomLoader from "../../components/Loader";
import { languageCombination } from "../../services/helpers";

// assets
import iconArrow from "../../assets/images/icon-arrowfaq.svg";

const Index = () => {
  const { t, i18n } = useTranslation();
  const [active, setActive] = useState(0);

  // const { data, isLoading, isError } = useGet({ ========>
  //   link: "/profile/faq",
  // });

  if (isLoading) return <CustomLoader />;
  if (isError) return <p>Error</p>;

  return (
    <div className="faq">
      <div className="faq__content">
        <Titling title="FAQ" />
        <div className="faq__body">
          <div className="faq__list">
            {data.map((item, i) => (
              <div
                key={`${item.id}-${i}`}
                className={`faq__item ${active === item.id && "opened"}`}
                onClick={() => setActive(item.id)}
              >
                <div className="faq__item-toggler">
                  <p className="faq__item-togglertxt">
                    {item.title[languageCombination(i18n.language)]}
                  </p>
                  <img
                    className="faq__item-togglerimg"
                    src={iconArrow}
                    alt="arrow"
                  />
                </div>
                <div className="faq__item-context">
                  <p>{item.content[languageCombination(i18n.language)]}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Index;
