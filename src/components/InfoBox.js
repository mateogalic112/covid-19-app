import React from 'react'
import './InfoBox.css'
import { Card, CardContent, Typography } from '@material-ui/core' 

function InfoBox({ active, title, cases, total, ...props }) {
    return (
        <Card 
        onClick={props.onClick}
        className={`info-box ${active && "info-box--selected"}`}>
            <CardContent>
                <Typography className="info-box__title" color="textSecondary">
                    {title}
                </Typography>

                <h2 className="info-box__cases">{cases}</h2>

                <Typography className="info-box__total" color="textSecondary">
                    {total} Total
                </Typography>
            </CardContent>
        </Card>
    )
}

export default InfoBox
