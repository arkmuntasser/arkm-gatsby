import React, { useState, useEffect } from 'react';
import { RightArrow as RightArrowIcon, Loader as LoaderIcon, Folder as FolderIcon } from '../components/Icons';
import '../styles/projects.css';

function Projects() {
	const [projects, setProjects] = useState([]);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState(false);

	useEffect(() => {
		const projectsPromise = fetch(
			'https://api.github.com/users/arkmuntasser/repos?sort=updated'
		);
		projectsPromise
			.then(res => res.json())
			.then(repos => {
				repos = repos
					.filter(repo => (
						!repo.private // remove private repos
						&& !repo.fork // remove repos that are forks
						&& !repo.name.includes('sv-') // remove sv related repos
						&& !repo.name.includes('arkm') // remove personal site repos
					))
					.slice(0, 6);

				setProjects(repos);
				setLoading(false);
			})
			.catch(err => {
				console.log(err);
				setError(true);
			});
	}, []);

	return (
		<section className="projects">
			<div className="inner">
				<h2>Recent Projects</h2>
				{
					loading
						? <div className="loader"><LoaderIcon /></div>
						: error
							? <div>Projects are currently unavailable...</div>
							: projects.map(project => (
									<article className="project" key={project.id}>
										<div className="icon" aria-hidden="true">
											<FolderIcon/>
										</div>
										<div className="text-content">
											<h3 className="title">
												<a href={project.html_url}>
													{project.name}
												</a>
											</h3>
											<p className="excerpt">{project.description}</p>
										</div>
									</article>
								))
				}
				<a className="view-all" href="https://github.com/arkmuntasser?tab=repositories">
					See all projects
					<RightArrowIcon />
				</a>
			</div>
		</section>
	)
}

export default Projects;
