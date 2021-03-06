import React, { Component } from "react";
import Head from 'next/head';
import { LanguageContext } from '../utils/LanguageContext';
import Config from '../config/config.json';
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
            <div className={"post post-ownstyle post-" + post.type} >
                <Head>
                    <title>{Config.title} - {post.title}</title>
                </Head>
                <h1>Alain DRILLON</h1>
                <LanguageContext.Consumer>
                    {value =>
                        <div className="post-content" >
                            <h2>{post.title}</h2>

                            <ul id="resume-basic-info" >
                                <li><i className="fa fa-male" />{age} {LangAPI.getInstance().getString(value.lang, 'resumes', 'yearsold')}</li>
                                <li><i className="fa fa-car" />{post.resume.resume_info.drivers_license}</li>
                                <li><i className="fa fa-map" />{post.resume.resume_info.location}</li>
                                <li className="resumeinfo-printonly" ><i className="fa fa-globe" />
                                    <a href={post.resume.resume_info.website} >
                                        {post.resume.resume_info.website.replace(/https?:\/\//, '')}
                                    </a>
                                </li>
                                <li className="resumeinfo-printonly" ><i className="fab fa-github" />
                                    <a href={"https://github.com/" + post.resume.resume_info.github} >
                                        {post.resume.resume_info.github}
                                    </a>
                                </li>
                            </ul>

                            <h3 id="resume-title-career">{LangAPI.getInstance().getString(value.lang, 'resumes', 'career')}</h3>
                            <div className="resume-block" id="resume-career" >
                                {post.resume.jobs.map((job, id) => (
                                    <div key={id} className="resume-subblock resume-job" >
                                        <div className="resume-item-date resume-job-dates" >
                                            {job.date_range}
                                        </div>
                                        <div className="resume-item-title resume-job-title" >{job.title}
                                            <span className="resume-job-company" >
                                                @&nbsp;
                                                {job.company_website ?
                                                        <a href={job.company_website} target="_blank" >{job.company}</a>
                                                : job.company}
                                            </span>
                                        </div>
                                        <div className="resume-job-description" dangerouslySetInnerHTML={{__html: job.description.replace(/\r\n/g, '<br />')}} />
                                    </div>
                                ))}
                            </div>

                            <h3 id="resume-title-education-certifications">{LangAPI.getInstance().getString(value.lang, 'resumes', 'education_and_certifications')}</h3>
                            <div className="resume-block" id="resume-diplomas" >
                                <h4>{LangAPI.getInstance().getString(value.lang, 'resumes', 'education')}</h4>
                                {post.resume.diplomas.map((diploma, id) => (
                                    <div key={id} className="resume-subblock resume-diploma" >
                                        <div className="resume-item-date resume-diploma-year" >
                                            {diploma.start_year == diploma.end_year ? diploma.start_year : diploma.start_year + ' - ' + diploma.end_year}
                                        </div>
                                        <div className="resume-item-title resume-diploma-title" >{diploma.title}</div>
                                        <div className="resume-diploma-location" >{diploma.location}</div>
                                    </div>
                                ))}
                            </div>

                            <div className="resume-block" id="resume-certifications" >
                                <h4>{LangAPI.getInstance().getString(value.lang, 'resumes', 'certifications')}</h4>
                                {post.resume.certifications.map((certification, id) => (
                                    <div key={id} className="resume-subblock resume-certification" >
                                        {id == 0 || certification.year != post.resume.certifications[id-1].year || certification.end_year != post.resume.certifications[id-1].end_year
                                            ? <div className="resume-item-date resume-certification-year" >
                                                {certification.end_year ? certification.year + ' - ' + certification.end_year : certification.year}
                                            </div>
                                            : ''
                                        }
                                        {certification.document ? <a href={certification.document} target="_blank" className="document-link fas fa-download" /> : ''}
                                        <div className="resume-item-title resume-certification-title" >{certification.name}</div>
                                    </div>
                                ))}
                            </div>

                            <h3>{LangAPI.getInstance().getString(value.lang, 'resumes', 'skills')}</h3>
                            <div className="resume-block" id="resume-skills" >
                                {post.resume.skills.map((skill, id) => (
                                    <div key={id} className="resume-subblock resume-skill" >
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
