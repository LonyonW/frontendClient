//require("dotenv").config();
const { createApp, ref, computed } = Vue;

//require("dotenv").config({path: __dirname + '/.env'});

//IP = process.env.DEFAULT_IP;

//const SERVICE_URL = "http://10.4.73.86:8888/cars";
const SERVICE_URL = "http://10.4.72.240:8888/cars";

const app = createApp({
  data() {
    const totalDonations = "";
    const value = 0;
    const message = "";
    const message1 = "";
    const photo = "https://img.freepik.com/vector-premium/ilustracion-coche-vector-porsche-911_721155-324.jpg";
    const license_plate = "TOT-999";
    const color = "gray"; // Remove the unnecessary line continuation character
    const license_Delete = "";
    const cars = [];
    return {
      totalDonations,
      value,
      message,
      message1,
      photo,
      license_plate,
      color,
      license_Delete,
      cars
    };
  },
  methods: {

    async sendDonation() {
      this.message = "Entra a sendDonation";
      const response = await fetch(SERVICE_URL, {
        method: "POST",
        body: JSON.stringify({ donationAmount: this.value }),
        headers: { "Content-type": "application/json; charset=UTF-8" },
      });
      if (response.status == 200) {
        this.message =
          "El valor ha sido actualizado, presione refrescar para ver el nuevo valor.";
      } else {
        this.message =
          "Ha ocurrido un error en el servidor y la donación no han sido registrados.";
      }
    },

    async sendCarData() {
      const carData = {
        photo: this.photo,
        license_plate: this.license_plate,
        color: this.color,
      };
      const response = await fetch(SERVICE_URL, {

        method: "POST",
        body: JSON.stringify(carData),
        headers: { "Content-type": "application/json; charset=UTF-8" },
      });
      const data = await response.json();
      if (response.ok) {
        if (data.code == 0) {
          this.message = "Error: " + data.message;
        } else {
          this.message = "Success: " + data.message;

        }
        //this.message = data.message;
      } 
      else {
        this.message = "Ha ocurrido un error en el servidor: " + data.message;
        //console.log("Error:", response);
      }
      
    },

    async retireCar() {
      const license_Delete = {
        license_delete: this.license_Delete,
      };
      const response = await fetch(SERVICE_URL, {
        method: "PATCH",
        body: JSON.stringify(license_Delete),
        //body: JSON.stringify({ license_Delete: this.license_Delete }),
        headers: { "Content-type": "application/json; charset=UTF-8" },
      });

      if (response.ok) {
        const car = await response.json();
        console.log("Car retired:", car);
      } else {
        console.log("Error:", response.status);
      }
    },
    
    async refreshDonations() {
      try {
        const response = await fetch(SERVICE_URL);
        const jsonResponse = await response.json();
        this.totalDonations = jsonResponse;
      } catch (error) {
        var date = new Date();
        let dia = date.getFullYear() +'-'+ date.getMonth()+ '-' +date.getDay()  + '-' +date.getHours()+':'+date.getMinutes()+':'+date.getMilliseconds();
        alert('error al solicitar datos del servidor ' + dia);
      }

    },

    async getCarsFromServer() {
      try {
        const response = await fetch(SERVICE_URL);

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        this.cars = await response.json();
        console.log('Cars from server:', cars);
      } catch (error) {
      }
    }
  },
});

app.mount("#app");
