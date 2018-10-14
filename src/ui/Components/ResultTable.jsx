import React, { Component } from 'react';

class ResultTable extends Component {
    render() {
        const { results } = this.props;
        return (
            <div className="table-container">
                <table className="table table-sm table-bordered table-dark">
                    <thead>
                        <tr>
                            <th scope="col">#</th>
                            <th scope="col">Name</th>
                        </tr>
                    </thead>
                    <tbody>{
                        results.map((res, index) =>
                            <tr key={res.id}>
                                <th scope="row">{index + 1}</th>
                                <td>{res.name}</td>
                            </tr>
                        )
                    }
                    </tbody>
                </table>
            </div>

        );
    }
}

export default ResultTable;