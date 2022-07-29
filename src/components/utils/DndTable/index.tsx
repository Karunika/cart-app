import React, { FC } from 'react';
import { DndTableContext } from './context';
import DndBody, { IDndBody } from './DndBody';
import DndHeader, { IDndHeader } from './DndHeader';
import DndRow, { IDndRow } from './DndRow';
import DndData from './DndData';

interface IDndTable {
    Row: FC<IDndRow>;
    Header: FC<IDndHeader>;
    Body: FC<IDndBody>;
    Data: FC;
}

const DndTable: FC & IDndTable = ({ children }) => {
    return (
        <DndTableContext.Provider value={null}>
            <table style={{ tableLayout: `fixed`, width: `100%` }}>
                {children}
            </table>
        </DndTableContext.Provider>
    );
};

DndTable.Header = DndHeader;
DndTable.Body = DndBody;
DndTable.Row = DndRow;
DndTable.Data = DndData;

export default DndTable;
