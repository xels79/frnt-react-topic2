import { Breadcrumbs, Link, Typography } from "@mui/material";
import { RootState } from "../../store/Store";
import { useSelector } from "react-redux";
import { useEffect } from "react";
import { useLocation } from "react-router-dom";

export default function MBreadcrumbs(){
    const crumbs = useSelector((state:RootState)=>state.breadCrumbs.items);
    const {pathname:location} = useLocation();
    return  <>{location!=='/' && <Breadcrumbs aria-label="breadcrumb">
        <Link underline="hover" color="inherit" href='/'>
            Главная
        </Link>
        {crumbs.map((crumb, index)=>{
            if (crumb.link===null){
                return <Typography key={`crumb-${index}`} color="text.primary">{crumb.label}</Typography>
            }else{
                return <Link key={`crumb-${index}`} underline="hover" color="inherit" href={crumb.link}>{crumb.label}</Link>
            }
        })}
    </Breadcrumbs>}</>
}