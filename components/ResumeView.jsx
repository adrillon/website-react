import React, { Component } from "react";
import { LanguageContext } from '../utils/LanguageContext';
import LangAPI from '../utils/LangAPI';
import '../css/resume.scss';

class ResumeView extends Component {
    render() {
        let post = this.props.post;

        let today = new Date();
        let birthday = new Date(post.resume.resume_info.birthdate);
        let age = Math.abs(today.getTime() - birthday.getTime());
        age = Math.floor(age / (1000 * 3600 * 24 * 365));

        return (
            <div className={"post post-" + post.type} >
                <h1>Alain DRILLON</h1>
                <LanguageContext.Consumer>
                    {value =>
                        <div className="post-content" >
                            <h2>{post.title}</h2>

                            <ul id="resume-basic-info" >
                                <li><i className="fa fa-male" />{age}</li>
                                <li><i className="fa fa-car" />{post.resume.resume_info.drivers_license}</li>
                                <li><i className="fa fa-map" />{post.resume.resume_info.location}</li>
                            </ul>

                            <h3>{LangAPI.getInstance().getString(value.lang, 'resumes', 'education_and_certifications')}</h3>
                            <div id="resume-diplomas" >
                                {post.resume.diplomas.map((diploma, id) => (
                                    <div key={id} className="resume-diploma" >
                                        <div className="resume-diploma-year" >
                                            {diploma.start_year == diploma.end_year ? diploma.start_year : diploma.start_year + ' - ' + diploma.end_year}
                                        </div>
                                        <div className="resume-diploma-title" >{diploma.title}</div>
                                        <div className="resume-diploma-location" >{diploma.location}</div>
                                    </div>
                                ))}
                            </div>

                            <div id="resume-certifications" >
                                {post.resume.certifications.map((certification, id) => (
                                    <div key={id} className="resume-certification" >
                                        {id == 0 || certification.year != post.resume.certifications[id-1].year || certification.end_year != post.resume.certifications[id-1].end_year
                                            ? <div className="resume-certification-year" >
                                                {certification.end_year ? certification.year + ' - ' + certification.end_year : certification.year}
                                            </div>
                                            : ''
                                        }
                                        {certification.document ? <a href={certification.document} target="_blank" className="document-link fas fa-download" /> : ''}
                                        <div className="resume-certification-title" >{certification.name}</div>
                                    </div>
                                ))}
                            </div>

                            <h3>{LangAPI.getInstance().getString(value.lang, 'resumes', 'skills')}</h3>
                            <div id="resume-skills" >
                                {post.resume.skills.map((skill, id) => (
                                    <div key={id} className="resume-skill" >
                                        <h4>{skill.title}</h4>
                                        <p dangerouslySetInnerHTML={{__html: skill.description.replace(/\r\n/g, '<br />')}} />
                                    </div>
                                ))}
                            </div>
                        </div>
                    }
                </LanguageContext.Consumer>
            </div>
        )
    }
}

export default ResumeView;
