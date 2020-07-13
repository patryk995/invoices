import React, { Component } from 'react';
import { FVEnum } from '../types';
import { dateToWords } from '../helpers';
import sanidentasLogo from '../sanidentas_logo.jpeg';
interface IProps {
    formValues: {
        [FVEnum.Order1]: number;
        [FVEnum.Order2]: number;
        [FVEnum.Invoice1]: number;
        [FVEnum.Invoice2]: number;
        [FVEnum.Eur]: string | null;
        [FVEnum.Ct]: string | null;
        [FVEnum.PriceInWords]: string;

        [FVEnum.Name]: string;
        [FVEnum.PersonalCode]: string | null;
        [FVEnum.Address]: string;
    };
    date: Date;
    pages: number;
}
export class InvoicePage extends Component<IProps> {
    render() {
        const { formValues: fV, date, pages } = this.props;
        const pagesNumber = new Array(pages).fill(0);
        console.log(pagesNumber);
        return <>{pagesNumber.map(() => this.invoice(fV, date))}</>;
    }
    invoice = (fV: any, date: Date) => (
        <div
            style={{
                height: '100vh',
                padding: '50px',
                display: 'flex',
                justifyContent: 'space-between',
                flexDirection: 'column',
                boxSizing: 'border-box',
            }}
        >
            <div>
                <img
                    src={sanidentasLogo}
                    style={{ width: 250 }}
                    alt='sanidentas'
                />
                <div
                    style={{
                        width: '100%',
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                    }}
                >
                    <div
                        style={{
                            fontWeight: 'bold',
                            fontSize: 18,
                            marginBottom: 10,
                        }}
                    >
                        SĄSKAITA FAKTŪRA
                    </div>
                    <div style={{ padding: '5px 0' }}>
                        Serija SDS Nr. {fV[FVEnum.Invoice1]}-
                        {fV[FVEnum.Invoice2]}
                    </div>
                    <div style={{ padding: '5px 0' }}>{dateToWords(date)}</div>
                    <div style={{ padding: '5px 0' }}>Vilnius</div>
                </div>
                <div style={{ padding: '5px 0', fontWeight: 'bold' }}>
                    Paslaugų teikėjas:
                </div>
                <div style={{ padding: '5px 0' }}>
                    UAB "Sanidentas" įmonės kodas 3000994735
                </div>
                <div style={{ padding: '5px 0' }}>
                    Duomenys kaupiami ir saugomi Juridinių asmenų registre
                </div>
                <div style={{ padding: '5px 0' }}>
                    Karaliaučiaus g. 2-58, LT-06281 Vilnius
                </div>
                <div style={{ padding: '5px 0' }}>Tel. +370 671 02370</div>
                <div style={{ padding: '5px 0' }}>
                    El. p. info@sanidentas.lt www.sanidentas.lt
                </div>
                <div style={{ padding: '5px 0' }}>
                    A. s. {process.env.REACT_APP_SASKAITA} swedbank
                </div>
                <div
                    style={{
                        fontStyle: 'italic',
                        fontWeight: 'bold',
                        textAlign: 'center',
                        padding: '20px 0',
                    }}
                >
                    DĖMESIO, PASIKEITĖ BANKO SĄSKAITOS REKVIZITAI!
                </div>

                <div style={{ fontWeight: 'bold' }}>Paslaugų pirkėjas:</div>
                <div style={{ padding: '5px 0' }}>{fV[FVEnum.Name]}</div>
                <div style={{ padding: '5px 0' }}>
                    Asmens (įmonės) kodas: {fV[FVEnum.PersonalCode]}
                </div>
                <div style={{ padding: '5px 0' }}>
                    Adresas: {fV[FVEnum.Address]}
                </div>

                <table style={{ width: '100%', margin: '5px auto' }}>
                    <thead style={{ fontWeight: 700 }}>
                        <tr>
                            <th>Paslaugos pavadinimas</th>
                            <th style={{ textAlign: 'center' }}>Kiekis</th>
                            <th style={{ textAlign: 'center' }}>Kaina, EUR</th>
                            <th style={{ textAlign: 'center' }}>Suma, EUR</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>dantų gydymas</td>
                            <td style={{ textAlign: 'center' }}>1</td>
                            <td style={{ textAlign: 'center' }}>
                                {fV[FVEnum.Eur]}.
                                {fV[FVEnum.Ct] ? fV[FVEnum.Ct] : '00'}
                            </td>
                            <td style={{ textAlign: 'center' }}>
                                {fV[FVEnum.Eur]}.
                                {fV[FVEnum.Ct] ? fV[FVEnum.Ct] : '00'}
                            </td>
                        </tr>
                        <tr>
                            <td
                                colSpan={3}
                                style={{
                                    borderBottom: 'transparent',
                                    borderLeft: 'transparent',
                                    textAlign: 'right',
                                    fontWeight: 'bold',
                                }}
                            >
                                Iš viso EUR:
                            </td>
                            <td
                                style={{
                                    fontWeight: 'bold',
                                    textAlign: 'center',
                                }}
                            >
                                {fV[FVEnum.Eur]}.
                                {fV[FVEnum.Ct] ? fV[FVEnum.Ct] : '00'}
                            </td>
                        </tr>
                    </tbody>
                </table>
                <div style={{ padding: '5px 0' }}>
                    Suma žodžiais: {fV[FVEnum.PriceInWords]}.
                </div>
                <div style={{ display: 'flex', padding: '20px 0' }}>
                    <span>Sąskaita išrašė </span>
                    <div style={{ flex: 1, borderBottom: '1px solid' }} />
                </div>
                <div style={{ display: 'flex', padding: '20px 0' }}>
                    <span>Sąskaita už suteiktas paslaugas gavau </span>
                    <div style={{ flex: 1, borderBottom: '1px solid' }} />
                </div>
            </div>
            <div
                style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    fontSize: 10,
                }}
            >
                <div style={{ padding: '5px 0' }}>UAB "SANIDENTAS"</div>
                <div style={{ padding: '5px 0' }}>ODONTOLOGIJOS KLINIKA</div>
            </div>
        </div>
    );
}

export default InvoicePage;
