import React, { useState, useEffect } from "react";
import { format } from "date-fns";
import { Form, Input, Label, Transition } from "semantic-ui-react";
import { priceToWordsHelper, saveLocalStorage } from "../helpers";
interface IProps {
  date: Date;
  toggleCalendar(): void;
}
enum FormValuesEnum {
  Invoice1 = "invoice1",
  Invoice2 = "invoice2",

  Order1 = "order1",
  Order2 = "order2",

  Eur = "eur",
  Ct = "ct",
  PriceInWords = "eurInWords",

  Name = "name",
  PersonalCode = "personalCode",
  Address = "address"
}

export const MainForm = ({ date, toggleCalendar }: IProps) => {
  useEffect(() => {
    saveLocalStorage("Hello World");
  }, []);

  const [formValues, setFormValue] = useState({
    [FormValuesEnum.Invoice1]: null,
    [FormValuesEnum.Invoice2]: null,

    [FormValuesEnum.Order1]: null,
    [FormValuesEnum.Order2]: null,

    [FormValuesEnum.Eur]: null,
    [FormValuesEnum.Ct]: null,
    [FormValuesEnum.PriceInWords]: "",

    [FormValuesEnum.Name]: "",
    [FormValuesEnum.PersonalCode]: null,
    [FormValuesEnum.Address]: ""
  });
  const setValue = (e: any, data: any) => {
    const { name, value } = data;
    if (name) {
      setFormValue({ ...formValues, [name]: value });
    }
  };

  useEffect(() => {
    setFormValue({
      ...formValues,
      [FormValuesEnum.PriceInWords]: `${priceToWordsHelper(
        Number(formValues[FormValuesEnum.Eur])
      )} ${
        formValues[FormValuesEnum.Ct] ? formValues[FormValuesEnum.Ct] : 0
      } ct`
    });
  }, [formValues[FormValuesEnum.Eur], formValues[FormValuesEnum.Ct]]);
  return (
    <div className="main-form">
      <Form>
        <div className="form-inner">
          <div className="form-column">
            <Form.Input
              icon="calendar outline"
              placeholder="Data"
              label="Data"
              id="date"
              readOnly
              onClick={toggleCalendar}
              value={format(date, "yyyy-MM-dd")}
            />
            <Form.Group>
              <Form.Field width={8}>
                <label>Sąskaita</label>
                <Input
                  type="number"
                  label={{ basic: true, content: "SDS" }}
                  name={FormValuesEnum.Invoice1}
                  value={formValues.invoice1}
                  onChange={setValue}
                  placeholder="Sąskaita"
                />
              </Form.Field>
              <span className="inputs-devider">-</span>
              <Form.Field width={8}>
                <label></label>
                <Input
                  type="number"
                  name={FormValuesEnum.Invoice2}
                  value={formValues.invoice2}
                  onChange={setValue}
                  placeholder="Sąskaita"
                />
              </Form.Field>
            </Form.Group>
            <Form.Group>
              <Form.Field width={8}>
                <label>Orderis</label>
                <Input
                  type="number"
                  label={{ basic: true, content: "SD" }}
                  name={FormValuesEnum.Order1}
                  value={formValues.order1}
                  onChange={setValue}
                  placeholder="Orderis"
                />
              </Form.Field>
              <span className="inputs-devider">-</span>

              <Form.Field width={8}>
                <label />
                <Input
                  type="number"
                  name={FormValuesEnum.Order2}
                  value={formValues.order2}
                  onChange={setValue}
                  placeholder="Orderis"
                />
              </Form.Field>
            </Form.Group>

            <Form.Group widths="equal">
              <Form.Field>
                <label>Suma</label>

                <Input
                  label="Eur"
                  type="number"
                  name={FormValuesEnum.Eur}
                  value={formValues[FormValuesEnum.Eur]}
                  onChange={setValue}
                  placeholder="Eurai"
                />
              </Form.Field>

              <Form.Field>
                <label />
                <Input
                  label="ct"
                  type="number"
                  name={FormValuesEnum.Ct}
                  value={formValues[FormValuesEnum.Ct]}
                  onChange={setValue}
                  placeholder="Centai"
                />
              </Form.Field>
            </Form.Group>
          </div>
          <div className="form-column">
            <Form.Input
              label="Vardas Pavardė"
              icon="user outline"
              name={FormValuesEnum.Name}
              value={formValues.name}
              onChange={setValue}
              placeholder="Vardas Pavardė"
            />

            <Form.Input
              label="Asmens (įmonės) kodas"
              icon="barcode"
              name={FormValuesEnum.PersonalCode}
              value={formValues.personalCode}
              onChange={setValue}
              placeholder="Asmens (įmonės) kodas"
            />
            <Form.Input
              label="Adresas"
              icon="home"
              type="text"
              name={FormValuesEnum.Address}
              value={formValues.address}
              onChange={setValue}
              placeholder="Adresas"
            />
            <Form.Input
              icon="euro sign"
              label="Suma žodžiais"
              placeholder="Suma žodžiais"
              value={
                Boolean(formValues[FormValuesEnum.Eur]) ||
                Boolean(formValues[FormValuesEnum.Ct])
                  ? formValues.eurInWords
                  : ""
              }
            />
          </div>
        </div>
      </Form>
    </div>
  );
};
export default MainForm;
