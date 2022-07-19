import React from "react";
import NovedadesItem from "./NovedadesItem";

function Novedades({ novedades }) {
  return (
    <div className="container d-flex flex-wrap">
      {novedades.map((novedad, i) => {
        let props = { ...novedad, i };
        return <NovedadesItem {...props} />;
      })}
    </div>
  );
}

export default Novedades;
