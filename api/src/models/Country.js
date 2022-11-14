const { DataTypes } = require('sequelize');
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = (sequelize) => {
  // defino el modelo
  sequelize.define('country', {
    id:{
      type: DataTypes.STRING(3),
      primaryKey: true,
      allowNull: false
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    flag:{
      type: DataTypes.STRING,
      allowNull: false,
      validate:{
        isUrl: true,
      }
    },
    continent:{
      type: DataTypes.STRING,
      allowNull: false
    },
    capital:{
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue: "Capital not found"
    },
    subregion:{
      type: DataTypes.STRING,
    },
    area:{
      type: DataTypes.FLOAT,
    },
    population:{
      type: DataTypes.INTEGER
    }
  },
    {timestamps : false}
  );
};

//ID (Código de 3 letras) *
// Nombre * name/ common
// Imagen de la bandera * flags/png
// Continente *    continents []
// Capital * capital
// Subregión subregion   ""
// Área      area decimal
// Población     population entero