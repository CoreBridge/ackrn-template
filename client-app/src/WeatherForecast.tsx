import React from "react";

export interface WeatherForecast
{
    date: Date;
    temperatureC: number;
    temperatureF: number;
    summary: string;
}

export class WeatherForecast extends React.Component<{}, {
    isLoaded: boolean,
    items?: Array<WeatherForecast>,
    error?: string
}>{

    constructor(props: any){
        super(props);
        this.state = {
            isLoaded: false
        }
    }
    
  componentDidMount() {
    fetch("/weatherforecast")
      .then(res => res.json())
      .then(
        (result: Array<WeatherForecast>) => {
          this.setState({
            isLoaded: true,
            items: result.map((x) => {
                x.date = new Date(x.date);
                return x;
            })
          });
        },
        // Note: it's important to handle errors here
        // instead of a catch() block so that we don't swallow
        // exceptions from actual bugs in components.
        (error) => {
          this.setState({
            isLoaded: true,
            error
          });
        }
      )
    }

    render(){
        if (this.state.error){
            return <div>{this.state.error}</div>
        } else if (this.state.items){
            return <div className="flex">
                {
                    this.state.items.map((x) => {
                        return <div key={x.date.toISOString()} className="forecast">
                            <div>
                                <h3>
                                    {x.date.toLocaleDateString()}
                                </h3>
                                <h3>
                                    {x.temperatureC}° C {x.temperatureF}° F
                                </h3>
                            </div>
                            <div>
                                {x.summary}
                            </div>
                        </div>
                    })
                }
            </div>
        }
        return <div>No forecast</div>
    }
}