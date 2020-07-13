import React, { Component } from 'react';
import { FVEnum } from '../types';
import { dateToWords } from '../helpers';
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
}
export class OrderPage extends Component<IProps> {
    render() {
        const { formValues: fV, date } = this.props;
        return (
            <div style={{ padding: '50px 80px' }}>
                {this.order(fV, date)}
                <div
                    style={{
                        width: '100%',
                        borderBottom: '1px dashed',
                        margin: '50px 0 30px',
                    }}
                />
                {this.order(fV, date)}
            </div>
        );
    }
    order = (fV: any, date: Date) => (
        <>
            <div
                style={{
                    width: '100%',
                    display: 'flex',
                    flexDirection: 'column',
                    textAlign: 'right',
                    fontSize: 12,
                    boxSizing: 'border-box',
                }}
            >
                <div>UAB "Sanidentas"</div>
                <div>Karaliaučiaus g. 2-58, LT-06281 Vilnius</div>
                <div>įmonės kodas 3000994735</div>
                <div>A/S {process.env.REACT_APP_SASKAITA}</div>
            </div>

            <div
                style={{
                    width: '100%',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    margin: '15px 0',
                }}
            >
                <div style={{ fontSize: 15 }}>
                    KASOS PAJAMŲ ORDERIS Serija SD Nr. {fV[FVEnum.Order1]}-
                    {fV[FVEnum.Order2]}
                </div>
                <div style={{ padding: '5px 0' }}>{dateToWords(date)}</div>
            </div>
            <div style={{ padding: '5px 0' }}>Mokėtojas: {fV[FVEnum.Name]}</div>
            <div style={{ padding: '5px 0' }}>
                Asmens (įmonės) kodas: {fV[FVEnum.PersonalCode]}
            </div>
            <div style={{ padding: '5px 0' }}>
                Adresas: {fV[FVEnum.Address]}
            </div>
            <div style={{ padding: '20px 0' }}>
                Operacijos turinys: dantų gydymas
            </div>
            <div style={{ padding: '5px 0' }}>
                Suma: {fV[FVEnum.Eur]} {fV[FVEnum.Ct] ? fV[FVEnum.Ct] : '00'}
            </div>
            <div style={{ padding: '5px 0' }}>
                Suma žodžiais:{' '}
                <span style={{ fontStyle: 'italic' }}>
                    {fV[FVEnum.PriceInWords]}.
                </span>
            </div>
            <div style={{ display: 'flex', padding: '15px 0' }}>
                <span>Vyr. Buhalteris (buhalteris)</span>
                <div style={{ flex: 1, borderBottom: '1px solid' }} />
            </div>
            <div style={{ display: 'flex', padding: '15px 0' }}>
                <span>Gavo</span>
                <div style={{ flex: 1, borderBottom: '1px solid' }} />
            </div>
        </>
    );
}

export default OrderPage;
