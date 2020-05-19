import React, { useState, useEffect, useRef } from 'react';
import format from 'date-fns/format';
import ReactToPrint from 'react-to-print';
import InvoicePage from './InvoicePage';
import { priceToWordsHelper, getLocal, setLocal } from '../helpers';
import { FVEnum } from '../types';
import OrderPage from './OrderPage';

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
            [FVEnum.Invoice2]: 0,
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
            [FVEnum.PriceInWords]: '',

            [FVEnum.Name]: '',
            [FVEnum.PersonalCode]: null,
            [FVEnum.Address]: '',
        };
    });
    const setValue = (e: any) => {
        const { name, value } = e.target;
        if (name) {
            setFormValue({ ...formValues, [name]: value });
        }
    };
    useEffect(() => {
        setLocal({
            [FVEnum.Order1]: formValues[FVEnum.Order1],
            [FVEnum.Order2]: formValues[FVEnum.Order2],
            [FVEnum.Invoice1]: formValues[FVEnum.Invoice1],
            [FVEnum.Invoice2]: formValues[FVEnum.Invoice2],
        });
    }, [
        formValues[FVEnum.Order1],
        formValues[FVEnum.Order2],
        formValues[FVEnum.Invoice1],
        formValues[FVEnum.Invoice2],
    ]);

    useEffect(() => {
        setFormValue({
            ...formValues,
            [FVEnum.PriceInWords]: `${priceToWordsHelper(
                Number(formValues[FVEnum.Eur])
            )} ${formValues[FVEnum.Ct] ? formValues[FVEnum.Ct] : 0} ct`,
        });
    }, [formValues[FVEnum.Eur], formValues[FVEnum.Ct]]);
    const incrementInvoice = () => {
        setFormValue({
            ...formValues,
            [FVEnum.Invoice2]: Number(formValues[FVEnum.Invoice2]) + 1,
        });
    };
    const incrementOrder = () => {
        setFormValue({
            ...formValues,
            [FVEnum.Order2]: Number(formValues[FVEnum.Order2]) + 1,
        });
    };
    return (
        <div className='main-form'>
            <div className='form-inner'>
                <div className='form-column'>
                    <div className='field'>
                        <label htmlFor='date'>Data</label>
                        <input
                            placeholder='Data'
                            id='date'
                            readOnly
                            onClick={toggleCalendar}
                            value={format(date, 'yyyy-MM-dd')}
                        />
                    </div>

                    <div className='field'>
                        <label htmlFor='SDS2'>Sąskaita (SDS)</label>
                        <div className='double-input'>
                            <input
                                id='SDS1'
                                className='left-db-input'
                                type='number'
                                name={FVEnum.Invoice1}
                                value={formValues.invoice1}
                                onChange={setValue}
                                placeholder='Sąskaita'
                            />

                            <input
                                id='SDS2'
                                type='number'
                                className='right-db-input'
                                name={FVEnum.Invoice2}
                                value={formValues.invoice2}
                                onChange={setValue}
                                placeholder='Sąskaita'
                            />
                        </div>
                    </div>
                    <div className='field'>
                        <label htmlFor={FVEnum.Order2}>Orderis (SD)</label>
                        <div className='double-input'>
                            <input
                                className='left-db-input'
                                type='number'
                                name={FVEnum.Order1}
                                value={formValues.order1}
                                onChange={setValue}
                                placeholder='Orderis'
                            />

                            <input
                                className='right-db-input'
                                type='number'
                                id={FVEnum.Order2}
                                name={FVEnum.Order2}
                                value={formValues.order2}
                                onChange={setValue}
                                placeholder='Orderis'
                            />
                        </div>
                    </div>

                    <div className='field'>
                        <label htmlFor={FVEnum.Eur}>Suma</label>
                        <div className='double-input price'>
                            <input
                                className='eur'
                                type='number'
                                id={FVEnum.Eur}
                                name={FVEnum.Eur}
                                value={formValues[FVEnum.Eur]}
                                onChange={setValue}
                                placeholder='Eurai'
                            />

                            <input
                                className='ct'
                                type='number'
                                name={FVEnum.Ct}
                                value={formValues[FVEnum.Ct]}
                                onChange={setValue}
                                placeholder='Centai'
                            />
                        </div>
                    </div>
                </div>
                <div className='form-column'>
                    <div className='field'>
                        <label htmlFor={FVEnum.Name}>Vardas Pavardė</label>
                        <input
                            id={FVEnum.Name}
                            name={FVEnum.Name}
                            value={formValues.name}
                            onChange={setValue}
                            placeholder='Vardas Pavardė'
                        />
                    </div>

                    <div className='field'>
                        <label htmlFor={FVEnum.PersonalCode}>
                            Asmens (įmonės) kodas
                        </label>
                        <input
                            type='number'
                            id={FVEnum.PersonalCode}
                            name={FVEnum.PersonalCode}
                            value={formValues.personalCode}
                            onChange={setValue}
                            placeholder='Asmens (įmonės) kodas'
                        />
                    </div>
                    <div className='field'>
                        <label htmlFor={FVEnum.Address}>Adresas</label>
                        <input
                            type='text'
                            id={FVEnum.Address}
                            name={FVEnum.Address}
                            value={formValues.address}
                            onChange={setValue}
                            placeholder='Adresas'
                        />
                    </div>
                    <div className='field'>
                        <label htmlFor='sumaZodziais'>Suma žodžiais</label>
                        <input
                            id='sumaZodziais'
                            placeholder='Suma žodžiais'
                            value={
                                Boolean(formValues[FVEnum.Eur]) ||
                                Boolean(formValues[FVEnum.Ct])
                                    ? formValues.eurInWords
                                    : ''
                            }
                        />
                    </div>
                </div>
            </div>

            <div className='buttons-container'>
                <button
                    className='btn secondary'
                    onClick={() => window.location.reload()}
                >
                    Išvalyti formą
                </button>

                <ReactToPrint
                    onAfterPrint={incrementInvoice}
                    trigger={() => (
                        <button className='btn primary'>
                            Spausdinti sąskaita faktūra
                        </button>
                    )}
                    content={() => invoiceRef && invoiceRef.current}
                />
                <ReactToPrint
                    onAfterPrint={incrementInvoice}
                    trigger={() => (
                        <button className='btn primary'>
                            Spausdinti 2 sąskaitas faktūras
                        </button>
                    )}
                    content={() => doubleInvoiceRef && doubleInvoiceRef.current}
                />
                <ReactToPrint
                    onAfterPrint={incrementOrder}
                    trigger={() => (
                        <button className='btn primary'>Spausdinti KPO</button>
                    )}
                    content={() => orderRef && orderRef.current}
                />
            </div>
            <div style={{ display: 'none' }}>
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
