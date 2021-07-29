<!--
*** Using markdown "reference style" links for readability.
*** Reference links are enclosed in brackets [ ] instead of parentheses ( ).
*** See the bottom of this document for the declaration of the reference variables.
*** https://www.markdownguide.org/basic-syntax/#reference-style-links
-->

<!-- PROJECT SHIELDS -->
[![Workflow][workflow-shield]][workflow-url]
[![Issues][issues-shield]][issues-url]
[![Version][version-shield]][version-url]
[![Stargazers][stars-shield]][stars-url]
[![Forks][forks-shield]][forks-url]
[![Contributors][contributors-shield]][contributors-url]
[![LinkedIn][linkedin-shield]][linkedin-url]



<!-- PROJECT LOGO -->
<br>
<div align="center">
  <a href="https://github.com/tberey">
    <img src="public/assets/logo.png" alt="TomCo (Technology & Online Media Company) Logo" width="200" height="100">
  </a><br><br>
  <div align="center"><h1>Chatroom</h1>A Realtime Browser Chat Application,<br>by TomCo (Technology & Online Media Company).</div>
  <div align="right">
    <br>
    <a href="https://github.com/tberey/ts-node-chatroom/blob/development/README.md"><strong>Documentation »</strong></a>
    <br>
    <a href="#usage">View Demo</a>
    ·
    <a href="https://github.com/tberey/ts-node-chatroom/issues">Report Bug</a>
    ·
    <a href="https://github.com/tberey/ts-node-chatroom/issues">Request Feature</a>
  </div>
</div>



<!-- TABLE OF CONTENTS -->
<details open="open" style="padding:4px;display:inline;border-width:1px;border-style:solid;">
  <summary><b style="display: inline-block"><u>Contents</u></b></summary>
    <ol>
        <li>
        <a href="#about-this-project">About</a>
        <ul>
            <li><a href="#tech-stack">Tech Stack</a></li>
        </ul>
        </li>
        <li>
        <a href="#startup">Startup</a>
        <ul>
            <li><a href="#prerequisites">Prerequisites</a></li>
            <li><a href="#installation">Installation</a></li>
        </ul>
        </li>
        <li>
        <a href="#usage">Usage</a>
        <ul>
            <li><a href="#screenshots">Screenshots</a></li>
        </ul>
        </li>
        <li><a href="#roadmap">Roadmap</a></li>
        <li><a href="#changelog">Changelog</a></li>
        <li><a href="#contributing">Contributing</a></li>
        <li><a href="#contact">Contact</a></li>
        <li><a href="#acknowledgements">Acknowledgements</a></li>
    </ol>
</details><hr><br>



<!-- ABOUT THis PROJECT -->
## About This Project
A Chatroom Application with User Authentication & Accounts. Login & Register to join a Chatroom, which is powered in realtime and dynamically, for all concurrently connected users. Also has the options to manage your chatting account, such as changing password or username (both of which are needed to register, or login), as well as display name. All Account information is queried and stored in a MySQL database, with passwords securely hashed first.

<sub>A locally hosted http REST API, made in Typescript and Node, with Express and Socket IO frameworks, supported by a MySQL database. Uses EJS template engine for client page serving.</sub>

### Tech Stack
* [Typescript](https://www.typescriptlang.org/)
* [NodeJS](https://nodejs.org/en/)
* [Scoket.io](https://socket.io/)
* [ExpressJS](https://expressjs.com/)
* [MySQL](https://www.mysql.com/)
* [EJS](https://ejs.co/)
* [Rollbar](https://rollbar.com/)
* [SimpleTxtLogger](https://www.npmjs.com/package/simple-txt-logger)
* [ESLint](https://eslint.org/)
* [MochaChai](https://mochajs.org/)

<br><hr><br>



<!-- STARTUP -->
## Startup
For help or guidance in downloading and running the application, see the following subsections.
<br>

#### Prerequisites
[You must have npm (node package manager) and Nodejs installed on your system!](https://docs.npmjs.com/downloading-and-installing-node-js-and-npm)

1. Setup npm:
  ```sh
  npm install npm@latest -g
  ```
<br>

#### Installation
1. Clone/Download:
  ```sh
  git clone https://github.com/tberey/ts-node-chatroom.git
  ```
2. Install:
  ```sh
  npm install && npm update
  ```
3. Start:
  ```sh
  npm run start:app
  ```

<br><hr><br>



<!-- USAGE EXAMPLES -->
## Usage

| Endpoint | Action/Desc. | Full URI <i>(hosted locally, for some port; e.g.: 3000)</i> |
|:---|:---|:---|
| <ul><li>"/"</li></ul> | Homepage:<br>The client-side landing page. | <ul><li>"http://localhost:3000/"</li></ul> |

<br>

### Screenshots
Shot#1<br>
![Screenshot#1](https://github.com/tberey/ts-node-chatroom/blob/development/screenshots/shot1.png?raw=true)

<br><hr><br>



<!-- ROADMAP -->
## Roadmap
Below is the refined and confirmed roadmap, that has been planned for completion. See [open issues][issues-url] and also the [project board][project-url], for any other proposed features or known issues, which may not be listed below.

| Feature/Task/Bugfix | Details | Version <i>(if released)</i> | Notes |
|:---|:---|:---|:---|
| <i>Bug#1</i> | <i>Bug details...</i> | <i>0.0.1</i> | <i>example#1</i> |
| <i>Feature#4</i> | <i>Feature details...</i> |   | <i>example#2</i> |

<br><hr><br>



<!-- CHANGELOG -->
## Changelog

|Version | Date | Changes |
|:---|:---|:---|
|Version 0.0.1 | [2020-03-08] | <ul><li>Initial Commit.</li><li>Add inital directory structure and files.</li><li>Build enables users to join, set a name (or not) and chat with each other.</li><li>Add dynamic 'who is typing' live indicator</li><li>Set un-changable unique ID to users, to trace all messages back to users.</li><li>Add logging/informative details about who connects/disconnects.</li><li>Add timestamp and further styling to messages.</li><li>Add Screenshots dir, and image screenshot files.</li><li>Add README.md</li></ul>|
|Version 0.0.2 | [2020-03-09] | <ul><li>Add new set to store chat/conversation history, which is sent to newly connected clients (enables full chat when client joins later/last).</li><li>Remove 'dist' and 'modules' folders. (After adding gitignore.)</li><li>Update README.md</li></ul>|
|Version 0.1.0 | [2020-03-10] | <ul><li>Add connected users list to client-side.</li><li>Add new IUser type for user's details, and create new set to hold these (and ammend IMessage type to accept this new type in place of exisiting props).</li><li>Update front-end DOM and appearance, to be more sensical.</li><li>Update public script to accept newly updated types/interfaces.</li><li>Update README.md</li></ul>|
|Version 0.2.0 | [2020-03-11] | <ul><li>Update connected users list on client-side, plus styling.</li><li>Update chatroom/message-list to have a scroll (overscroll) feature, for large amounts of messages.</li><li>Add feature to always scroll to bottom of chatroom/messages-list.</li><li>Update the user set list to remove contacts on disconnection, and send updated list out to remaining.</li><li>General code sharpening.</li><li>Update 'Screenshots' dir, with new images.</li><li>Update README.md</li></ul>|
|Version 0.2.1 | [2020-03-12] | <ul><li>Add feature to show all users who may be typing concurrently (so more than one at a time).</li><li>Add server messages feature, to alert connected users of updates to other connected users. I.e. connecting/disconnecting.</li><li>Fix bug, where when any user sends a message it would clear all user's input field of text.</li><li>General code sharpening/tidying, and minor client-side DOM adjustments.</li><li>Update README.md</li></ul>|
|Version 0.2.2 | [2020-03-13] | <ul><li>Friday the 13th Update, spoooky.</li><li>Add basic mySQL database infrastructure and connection.</li><li>Update Screenshots.</li><li>Update README.md</li></ul>|
|Version 0.2.3 | [2020-03-17] | <ul><li>Add further mySQL database infrastructure, including add a new entry row comprised of ID(Pri Key), Username and Password(Hashed).</li><li>Add new front-end form, for use to make a post request on register button, to add new user details to db.</li><li>Add new dependacy/module, for parseing request body.</li><li>Update README.md</li></ul>|
|Version 0.3.0 | [2020-03-20] | <ul><li>Big Update - Full SQL Database Integration and Support.</li><li>Add full user authentification to login client page, in order to access chatroom.</li><li>Complete the login client page registration feature, including adding new users as a row to sql db.</li><li>Full chatroom username and unique ID integration with sql db - all details are pulled from db.</li><li>Add my account section to chatroom client page, with an account overview.</li><li>Ability to change password in the my account section of chatroom, reflected into db also.</li><li>Update change username to also update account section and sql database entry.</li><li>Redirections: When not logged in, always redirect too the login client page. When logged in, always redirect to chatroom client page.</li><li>Update README.md</li></ul>|
|Version 0.3.1 | [2020-03-21] | <ul><li>Add full catch and redirection system, built up from previous implementation: Now catches any attempted unresolved urls, or unauthorised access (not logged-in), and redirects appropriately.</li><li>Upgrade Account section, when logged in: A further check on changing password, and also move change username to this section. Also add collapsing menu, for all options currently available.</li><li>Adjusted and refine code all around, as well as check and sure up comments. Adjusted so all data now come from server too.</li><li>Bug Fixes and Testing.</li><li>Update README.md</li></ul>|
|Version 0.4.0 | [2020-03-23] | <ul><li>Picture Day Update!</li><li>Redesign front-end/client-side: Updated better visuals and slightly altered chatroom layout.</li><li>Adjust css/html for better scaling - Now much more viewable across a range devices/screen sizes.</li><li>Add logout button/feature to account section in ChatRoom which disconnects from chat, logs user out (clears session data), to be returned to login page.</li><li>Adjusted sockets to use session data, rather than exported variables, for login status and username/id.</li><li>Minor routing changes.</li><li>Bug Fixes and Tidy-up.</li><li>Moves sensitive/destructive data to external json file (git-ignored), that is imported and read from.</li><li>Updated all screenshots in Screenshot Directory.</li><li>Update README.md</li></ul>|
|Version 0.4.1 | [2020-03-24] | <ul><li>Minor request type changes (post -> delete/put, etc).</li><li>CSS/HTML minor adjustments and fine-tune.</li><li>Add Delete account check and action (with route and request), to delete account from db, log user out and redirect to login/register page.</li><li>Update README.md</li></ul>|
|Version 0.4.2 | [2020-03-25] | <ul><li>Add check/feature to prevent multiple instances (or log-in) of the same account.</li><li>Add further error handling/catching for requests/socket-connections, preventing db changes or chatroom/account access, if user is no longer logged in.</li><li>Update README.md</li></ul>|
|Version 0.4.3 | [2020-03-26] | <ul><li>Add check/feature to registering, requiring the user to confirm chosen password when signing up, and accompanying client-side error handling (not necessary to be done on server-side, as it is not damaging/deleting any assets if the user is able to skip this check).</li><li>Update README.md</li></ul>|
|Version 1.0.0 | [2020-04-02] | <ul><li>1.0 Release!</li><li>Update Types in routing.</li><li>Update README.md</li></ul>|
|Version 2.0.0 | [2020-05-18] | <ul><li>TypeScript & Class Update - Whilst already a TypeScript project, it has been further updated to make more and better use of TypeScript features, as well as reconstructed into a more object oriented and class based design. Also sharpened up the code, fixing any mistakes, inconsistencies, or general improvements.</li><li>Update README.md</li></ul>|
|Version 2.1.0 | [2020-05-19] | <ul><li>EJS Update - Whilst already a EJS Templated project, it has been further updated to make more and better use of ejs engine features, as well as compacting the code, fixing any mistakes/bugs, inconsistencies, and general improvements.</li><li>Update README.md</li></ul>|
|Version 2.1.1 | [2020-05-20] | <ul><li>EJS Update - Further and general improvements.</li><li>Client-side Scripting restructure & tidy-up.</li><li>Update README.md</li></ul>|
|Version 2.2.0 | [2020-05-20] | <ul><li>Final EJS Update & Cleanup</li><li>Further client-side Scripting restructure & tidy-up.</li><li>CSS stylesheets consolidation (2=>1).</li><li>Comments rewriting and tidy.</li><li>Final checkovers and tidy up + Testing.</li><li>Update README.md</li></ul>|
|Version 2.2.0 | [2020-05-20] | <ul><li>Renaming and descriptions editing.</li><li>Update README.md</li></ul>|
|Version 3.0.0 | [2021-07-29] | <ul><li>Project-wide update, reformat and clean-up, including modules.</li><li>Update README.md</li></ul>|

<br><hr><br>



<!-- CONTRIBUTING -->
## Contributing
Contributions are welcomed and, of course, **greatly appreciated**.

1. Fork the Project.
2. Create your Feature Branch (`git checkout -b feature/Feature`)
3. Commit your Changes (`git commit -m 'Add some Feature'`)
4. Push to the Branch (`git push origin feature/Feature`)
5. Open a Pull Request.

<br><hr><br>



<!-- CONTACT -->
### Contact

<b>Tom Berey</b>; <i>Project Manager, Lead Developer, Principal Tester & Customer Services</i>;<br>tomberey1@gmail.com;

* [Issues & Requests][issues-url]
* [My Other Projects](https://github.com/tberey?tab=repositories)
* [Personal Website](https://tberey.github.io/)
* [Linked In](https://uk.linkedin.com/in/thomas-berey-2a1860129)

<br>

<!-- ACKNOWLEDGEMENTS -->
### Acknowledgements

* [Me](https://github.com/tberey)



<br><br><hr><div align="center">TomCo&trade; (Technology & Online Media Company &copy;)</div>




<!-- SPECIFIC URLS - NEED CHANGING PER PROJECT -->
[workflow-shield]: https://github.com/tberey/ts-node-chatroom/actions/workflows/codeql-analysis.yml/badge.svg
[workflow-url]: https://github.com/tberey/ts-node-chatroom/actions
[version-shield]: https://img.shields.io/github/v/release/tberey/ts-node-chatroom
[version-url]: https://github.com/tberey/ts-node-chatroom/releases/
[stars-shield]: https://img.shields.io/github/stars/tberey/ts-node-chatroom.svg
[stars-url]: https://github.com/tberey/ts-node-chatroom/stargazers
[contributors-shield]: https://img.shields.io/github/contributors/tberey/ts-node-chatroom.svg
[contributors-url]: https://github.com/tberey/ts-node-chatroom/graphs/contributors
[forks-shield]: https://img.shields.io/github/forks/tberey/ts-node-chatroom.svg
[forks-url]: https://github.com/tberey/ts-node-chatroom/network/members
[issues-shield]: https://img.shields.io/github/issues/tberey/ts-node-chatroom.svg
[issues-url]: https://github.com/tberey/ts-node-chatroom/issues
[linkedin-shield]: https://img.shields.io/badge/-LinkedIn-black.svg?logo=linkedin&colorB=555
[linkedin-url]: https://uk.linkedin.com/in/thomas-berey-2a1860129
[project-url]: https://github.com/tberey/ts-node-chatroom/projects