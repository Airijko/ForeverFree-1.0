import { Grid } from '@mui/material';

import MainNav from './MainNav';

export default function Layout({ children }) {
    return (
        <>
            <MainNav />
            <Grid>{children}</Grid>
        </>
    )
}