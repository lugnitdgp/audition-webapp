import React,{ useState } from "react"
import Grid from "@material-ui/core/Grid"
import MenuAppBar from "../components/Header/Header"
import { Typography} from "@material-ui/core";
import StudentCard from "../components/StudentCard"

export default function AdminDash(classes) {
    const [studentTotal, setStudent] = useState([]);

    useEffect(() => {
        fetch
      }, []);

    return (
        <>
            <MenuAppBar />
            <Grid container spacing={0} className="contestMainrow">
                    <Grid item xs={12} md={3} className="ContestSectionHead">
                      Students Participating
                    </Grid>
                    {studentTotal.length >0?(
                    <Grid item xs={12} md={9} className="ContestGrid2">
                      {studentTotal[0].length > 0 ? (
                        <>
                          {studentTotal[0].map((res) => (
                            <div className="horizontalscroll">
                              <StudentCard contestInfo={res} />
                            </div>
                          ))}
                        </>
                      ) : (
                        <Typography className="noContestResponse">
                          There are no ongoing contests right now.
                        </Typography>
                      )}
                    </Grid>):null
                    }
                  </Grid>
        </>
    )
}