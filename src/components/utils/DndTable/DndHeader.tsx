import React, { FC } from 'react';

export interface IDndHeader {
    columns: [string, number][];
}

const DndHeader: FC<IDndHeader> = ({ columns }) => {
    return (
        <>
            <colgroup>
                {columns.map((column: [string, number], i: number) => (
                    <col span={1} key={i} width={column[1]} />
                ))}
            </colgroup>
            <tr>
                {columns.map((column: [string, number], i: number) => (
                    <th key={i}>{column[0]}</th>
                ))}
            </tr>
        </>
    );
};

export default DndHeader;
