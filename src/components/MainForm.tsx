import React, { useState, useEffect, useRef } from "react";
import { format } from "date-fns";
import ReactToPrint from "react-to-print";
import InvoicePage from "./InvoicePage";
import { Form, Input, Button } from "semantic-ui-react";
import { priceToWordsHelper, getLocal, setLocal } from "../helpers";
import { FVEnum } from "../types";
import OrderPage from "./OrderPage";

interface IProps {
    date: Date;
    toggleCalendar(): void;
}

export const MainForm = ({ date, toggleCalendar }: IProps) => {
    const invoiceRef: any = useRef(null);
    const doubleInvoiceRef: any = useRef(null);
    const orderRef: any = useRef(null);

    const [formValues, setFormValue] = useState(() => {
        const initialNumberObject = {
            [FVEnum.Order1]: 0,
            [FVEnum.Order2]: 0,
            [FVEnum.Invoice1]: 0,
            [FVEnum.Invoice2]: 0
        };
        const savedNumbersObject = getLocal();
        let numbers;
        if (savedNumbersObject) {
            numbers = savedNumbersObject;
        } else {
            numbers = initialNumberObject;
        }
        return {
            ...numbers,
            [FVEnum.Eur]: null,
            [FVEnum.Ct]: null,
            [FVEnum.PriceInWords]: "",

            [FVEnum.Name]: "",
            [FVEnum.PersonalCode]: null,
            [FVEnum.Address]: ""
        };
    });
    const setValue = (e: any, data: any) => {
        const { name, value } = data;
        if (name) {
            setFormValue({ ...formValues, [name]: value });
        }
    };
    useEffect(() => {
        setLocal({
            [FVEnum.Order1]: formValues[FVEnum.Order1],
            [FVEnum.Order2]: formValues[FVEnum.Order2],
            [FVEnum.Invoice1]: formValues[FVEnum.Invoice1],
            [FVEnum.Invoice2]: formValues[FVEnum.Invoice2]
        });
    }, [
        formValues[FVEnum.Order1],
        formValues[FVEnum.Order2],
        formValues[FVEnum.Invoice1],
        formValues[FVEnum.Invoice2]
    ]);

    useEffect(() => {
        setFormValue({
            ...formValues,
            [FVEnum.PriceInWords]: `${priceToWordsHelper(
                Number(formValues[FVEnum.Eur])
            )} ${formValues[FVEnum.Ct] ? formValues[FVEnum.Ct] : 0} ct`
        });
    }, [formValues[FVEnum.Eur], formValues[FVEnum.Ct]]);
    const incrementInvoice = () => {
        setFormValue({
            ...formValues,
            [FVEnum.Invoice2]: Number(formValues[FVEnum.Invoice2]) + 1
        });
    };
    const incrementOrder = () => {
        setFormValue({
            ...formValues,
            [FVEnum.Order2]: Number(formValues[FVEnum.Order2]) + 1
        });
    };
    console.log(orderRef);
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
                                    label={"SDS"}
                                    name={FVEnum.Invoice1}
                                    value={formValues.invoice1}
                                    onChange={setValue}
                                    placeholder="Sąskaita"
                                />
                            </Form.Field>
                            <Form.Field width={8}>
                                <label></label>
                                <Input
                                    type="number"
                                    label="-"
                                    name={FVEnum.Invoice2}
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
                                    label={"SD"}
                                    name={FVEnum.Order1}
                                    value={formValues.order1}
                                    onChange={setValue}
                                    placeholder="Orderis"
                                />
                            </Form.Field>

                            <Form.Field width={8}>
                                <label />
                                <Input
                                    label="-"
                                    type="number"
                                    name={FVEnum.Order2}
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
                                    name={FVEnum.Eur}
                                    value={formValues[FVEnum.Eur]}
                                    onChange={setValue}
                                    placeholder="Eurai"
                                />
                            </Form.Field>

                            <Form.Field>
                                <label />
                                <Input
                                    label="ct"
                                    type="number"
                                    name={FVEnum.Ct}
                                    value={formValues[FVEnum.Ct]}
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
                            name={FVEnum.Name}
                            value={formValues.name}
                            onChange={setValue}
                            placeholder="Vardas Pavardė"
                        />

                        <Form.Input
                            label="Asmens (įmonės) kodas"
                            icon="barcode"
                            type="number"
                            name={FVEnum.PersonalCode}
                            value={formValues.personalCode}
                            onChange={setValue}
                            placeholder="Asmens (įmonės) kodas"
                        />
                        <Form.Input
                            label="Adresas"
                            icon="home"
                            type="text"
                            name={FVEnum.Address}
                            value={formValues.address}
                            onChange={setValue}
                            placeholder="Adresas"
                        />
                        <Form.Input
                            icon="euro sign"
                            label="Suma žodžiais"
                            placeholder="Suma žodžiais"
                            value={
                                Boolean(formValues[FVEnum.Eur]) ||
                                Boolean(formValues[FVEnum.Ct])
                                    ? formValues.eurInWords
                                    : ""
                            }
                        />
                    </div>
                </div>
            </Form>

            <div className="buttons-container">
                <Button secondary onClick={() => window.location.reload()}>
                    Išvalyti formą
                </Button>

                <ReactToPrint
                    onAfterPrint={incrementInvoice}
                    trigger={() => (
                        <Button primary>Spausdinti sąskaita faktūra</Button>
                    )}
                    content={() => invoiceRef && invoiceRef.current}
                />
                <ReactToPrint
                    onAfterPrint={incrementInvoice}
                    trigger={() => (
                        <Button primary>Spausdinti 2 sąskaitas faktūras</Button>
                    )}
                    content={() => doubleInvoiceRef && doubleInvoiceRef.current}
                />
                <ReactToPrint
                    onAfterPrint={incrementOrder}
                    trigger={() => <Button primary>Spausdinti KPO</Button>}
                    content={() => orderRef && orderRef.current}
                />
            </div>
            <div style={{ display: "none" }}>
                <div ref={orderRef}>
                    <OrderPage formValues={formValues} date={date} />
                </div>
                <div ref={doubleInvoiceRef}>
                    <InvoicePage
                        formValues={formValues}
                        date={date}
                        pages={2}
                    />
                </div>
                <div ref={invoiceRef}>
                    <InvoicePage
                        formValues={formValues}
                        date={date}
                        pages={1}
                    />
                </div>
            </div>
        </div>
    );
};
export default MainForm;
