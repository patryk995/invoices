import React, { Component } from "react";

export class InvoicePage extends Component {
  render() {
    return (
      <div>
        <h1 className="text-center w-100">SĄSKAITA FAKTŪRA</h1>
        <div className="text-center w-100">Serija SDS Nr. 16-1940</div>

        <table style={{ margin: "auto" }}>
          <thead style={{ fontWeight: 700 }}>
            <th>Paslaugos pavadinimas</th>
            <th>Kiekis</th>
            <th>Kaina, EUR</th>
            <th>Suma, EUR</th>
          </thead>
          <tbody>
            <tr>
              <td>dantų gydymas</td>
              <td>1</td>
              <td>50.00</td>
              <td>50.00</td>
            </tr>
            <tr>
              <td></td>
              <td></td>
              <td>Iš viso EUR:</td>
              <td>50</td>
            </tr>
          </tbody>
        </table>
        <div className="w-100">Suma žodžiais: penkiasdešimt EUR 00ct.</div>
        <div className="w-100">Sąskaita išrašė _______</div>
        <div className="w-100">
          Sąskaita už suteiktas paslaugas gavau ______
        </div>
      </div>
    );
  }
}

export default InvoicePage;
