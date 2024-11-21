import { Accordion, AccordionDetails, AccordionSummary } from '@mui/material';
import { DataGrid } from '@mui/x-data-grid';
import { parseTimestamp } from '@/utils/helpers';

const columns = [
  {
    field: 'nickname',
    headerName: 'Nickname',
    flex: 1
  },
  {
    field: 'referredBy',
    headerName: 'Sponsor',
    flex: 1
  },
  {
    field: 'referrals',
    headerName: 'Referrals',
    flex: 1
  },
  {
    field: 'registrationDate',
    headerName: 'Registration Date',
    flex: 1
  },
  {
    field: 'invested',
    headerName: 'Deposited',
    flex: 1
  },
];


const LevelAccordion = ({ level, referrals }) => {
  const activeReferrals = referrals.filter(referral => referral.invested > 0);
  const totalIncome = referrals.reduce((accum, currentValue) => accum + currentValue.invested, 0)

  return (
    <Accordion sx={{ background: "none", color: "white", border: "1px solid rgba(255,255, 255, 0.1)", borderRadius: "10px", marginBottom: "15px" }}>
      <AccordionSummary
        aria-controls="panel1-content"
        id="panel1-header"
        sx={{ "& > div": { display: "grid", gridTemplateColumns: "25% 25% 25% 25%" } }}
      >
        <p>{level}</p>
        <p>{referrals.length} шт.</p>
        <p>{activeReferrals.length} шт.</p>
        <p>${totalIncome}</p>
      </AccordionSummary>
      <AccordionDetails>
        <DataGrid
          sx={{
            color: "white",
            '& .MuiDataGrid-columnHeaderTitleContainer': {color: "white"},
            '& .MuiTablePagination-root': {color: "white"},
            '& .MuiDataGrid-container--top [role=row]': {background: "#14cc74"},
            // '& .MuiDataGrid-columnHeaderTitleContainer': {color: "white"}
        }}
          rows={referrals.map((item, index) => {
            return {
              ...item,
              id: index,
              registrationDate: parseTimestamp(item.registrationDate),
              referrals: `${referrals.length} шт.`,
              invested: `$${item.invested}`
            }
          })}
          columns={columns}
          initialState={{
            pagination: {
              paginationModel: {
                pageSize: 5,
              },
            },
          }}
          pageSizeOptions={[5]}
          // checkboxSelection
          disableRowSelectionOnClick
        />
      </AccordionDetails>
    </Accordion>
  );
};

export default LevelAccordion;