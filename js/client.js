const { createApp, ref, computed } = Vue;

const SERVICE_URL = "http://10.4.74.181:3000/cars";

const app = createApp({
  data() {
    const totalDonations = "";
    const value = 0;
    const message = "";
    const message1 = "";
    const photo = "https://example.png";
    const license_plate = "loc-551";
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
      const response = await fetch("http://localhost:3000/donations", {
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
      if (response.status == 200) {
        this.message = "El vehiculo ha sido registrado.";
      } else {
        this.message = "Ha ocurrido un error en el servidor.";
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
      const response = await fetch(SERVICE_URL);
      const jsonResponse = await response.json();
      this.totalDonations = jsonResponse;
      
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
        console.log('There was a problem with the fetch operation: ', error);
      }
    }
    
  },
});

app.mount("#app");
