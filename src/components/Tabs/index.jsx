import React, { useState } from "react";
import { useTranslation } from "react-i18next";

function Index({ tabitems, changeTab = () => {} }) {
  const [tabs, setTabs] = useState(tabitems);
  const { t } = useTranslation();

  const setTab = (item) => {
    const data = tabitems.map((el) => {
      if (el.title === item.title) {
        el.isSelected = true;
      } else {
        el.isSelected = false;
      }

      return el;
    });
    setTabs(data);
    changeTab(data.find((el) => el.isSelected));
  };

  return (
    <div className="tabs">
      <ul className="tabs__list">
        {tabs.map((item, i) => (
          <li
            key={`${item.title}-${i}`}
            className={`tabs__item ${item.isSelected && "current"}`}
            onClick={() => setTab(item)}
          >
            {t(item.title)}
          </li>
        ))}
      </ul>
    </div>
  );
}
export default Index;
