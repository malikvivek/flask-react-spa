import React, { Component } from 'react';

export default class DocComponent extends Component {
    renderHtml(html, key=0) {
        return (
            <div key={key}>
                <div dangerouslySetInnerHTML={{__html: html}}></div>
                <pre><code>{html}</code></pre>
            </div>
        );
    }

    renderDescription(description) {
        if (!description) return null;

        if (!Array.isArray(description)) {
            description = [description]
        }

        return description.map((desc, i) => {
            return <p key={i} dangerouslySetInnerHTML={{__html: desc}}></p>
        });
    }


    render() {
        let obj = this,
            topLevel = true;

        if (this.props.hasOwnProperty('html')) {
            obj = this.props;
            topLevel = false;
        }
        const { title, description, html } = obj;

        if (!title && !html) {
            throw new Error('Either specify title and html as class variables or override the render() function.');
        }

        return (
            <div>
                {topLevel ? <h2>{title}</h2> : <h3>{title}</h3>}
                {this.renderDescription(description)}
                {Array.isArray(html)
                    ? html.map((chunk, i) => this.renderHtml(chunk, i))
                    : this.renderHtml(html)
                }
            </div>
        );
    }
}
