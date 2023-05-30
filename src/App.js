import { useState, useEffect } from "react";
import * as React from "react";
import Axios from "axios";
import './App.css';
import { Token } from "./Token";

const App = () =>{
    // Open tickets
    const [openData, setOpenData] = useState(null);

    // Developers
    const [laurisTickets, setLaurisTickets] = useState(null);
    const [janisTickets, setJanisTickets] = useState(null);
    const [danilsTickets, setDanilsTickets] = useState(null);
    const [marcisTickets, setMarcisTickets] = useState(null);
    const [davisTickets, setDavisTickets] = useState(null);
    const [developerTickets, setDeveloperTickets] = useState("");

    // Supports
    const [konstantinsTickets, setKonstantinsTickets] = useState(null);
    const [edgarsTickets, setEdgarsTickets] = useState(null);
    const [eduardsTickets, setEduardsTickets] = useState(null);
    const [supportTickets, setSupportTickets] = useState("");

    // For owner and developer filter options
    const [users, setUsers] = useState(null);
    const [owner, setOwner] = useState("");
    const [developer, setDeveloper] = useState("");
    const [suggestionsOwner, setSuggestionsOwner] = useState(null);
    const [suggestionsDeveloper, setSuggestionsDeveloper] = useState(null);

    const token = new Token();

    // For developer side "Ticket type" dropdown
    const typeOptions = [
        {label: 'Support', value: 'Ventspils_Support'},
        {label: 'Internal', value: 'Ventspils_Internal'},
      ];
    
    const [typeValue, setValue] = useState('Ventspils_Support');

    const handleChange = (event) => {
        setValue(event.target.value);
        fetchDeveloperTickets(event.target.value, owner, developer);
    };

    const [navBarValue, setNavBarValue] = useState('developer');

    // For owner search bar
    const onSuggestOwnerHandler = (text) =>{
        setOwner(text);
        setSuggestionsOwner([]);
    }

    const handleOwnerChange = (text) =>{
        let matches = []
        if(text.length > 0){
            matches = users.filter(user=>{
                const regex = new RegExp(`${text}`,"gi");
                return user.name.match(regex);
            })
        }
        setSuggestionsOwner(matches.slice(0, 5));
        setOwner(text);
    }

    const handleResetOwner = () =>{
        setOwner("");
        setSupportTickets("");
        fetchDeveloperTickets(typeValue, "", developer);
        fetchSupportTickets("", developer);
    }

    const handleSearchOwner = () =>{
        fetchDeveloperTickets(typeValue, owner, developer);
        fetchSupportTickets(owner, developer);
    }

    // For developer search bar
    const onSuggestDeveloperHandler = (text) =>{
        setDeveloper(text);
        setSuggestionsDeveloper([]);
    }

    const handleDeveloperChange = (text) =>{
        let matches = [];
        if(text.length > 0){
            matches = users.filter(user=>{
                const regex = new RegExp(`${text}`,"gi");
                return user.name.match(regex);
            })
        }
        setSuggestionsDeveloper(matches.slice(0, 5));
        setDeveloper(text);
    }

    const handleResetDeveloper = () =>{
        setDeveloper("");
        setDeveloperTickets("");
        fetchDeveloperTickets(typeValue, owner, "");
        fetchSupportTickets(owner, "");
    }

    const handleSearchDeveloper = () =>{
        fetchDeveloperTickets(typeValue, owner, developer);
        fetchSupportTickets(owner, developer);
    }

    useEffect(() => {
        fetchDeveloperTickets(typeValue, owner, developer);
        fetchSupportTickets(owner, developer);
        fetchUsers();
    }, []);
    

    function fetchSupportTickets(owner, developer){
        if(owner === "" && developer === ""){
            Axios.get(token.getLink()+"/api/v4/projects/31/issues?state=opened&labels=Ventspils_Support&author_username=konstantins.tretjaks&access_token=" +token.get()).then((res) =>{
                setKonstantinsTickets(res.data);
            });
            Axios.get(token.getLink()+"/api/v4/projects/31/issues?state=opened&labels=Ventspils_Support&author_username=edgars.priede&access_token=" +token.get()).then((res) =>{
                setEdgarsTickets(res.data);
            });
            Axios.get(token.getLink()+"/api/v4/projects/31/issues?state=opened&labels=Ventspils_Support&author_username=eduards.pastars&access_token=" +token.get()).then((res) =>{
                setEduardsTickets(res.data);
            });
        }
        else if(owner === "" && developer !== ""){
            Axios.get(token.getLink()+"/api/v4/projects/31/issues?state=opened&labels=Ventspils_Support&author_username=konstantins.tretjaks&assignee_username="+developer+"&access_token=" +token.get()).then((res) =>{
                setKonstantinsTickets(res.data);
            });
            Axios.get(token.getLink()+"/api/v4/projects/31/issues?state=opened&labels=Ventspils_Support&author_username=edgars.priede&assignee_username="+developer+"&access_token=" +token.get()).then((res) =>{
                setEdgarsTickets(res.data);
            });
            Axios.get(token.getLink()+"/api/v4/projects/31/issues?state=opened&labels=Ventspils_Support&author_username=eduards.pastars&assignee_username="+developer+"&access_token=" +token.get()).then((res) =>{
                setEduardsTickets(res.data);
            });
        }
        else if(owner !== "" && developer === ""){
            Axios.get(token.getLink()+"/api/v4/projects/31/issues?state=opened&labels=Ventspils_Support&author_username="+owner+"&access_token=" +token.get()).then((res) =>{
                setSupportTickets(res.data);
            });
        }
        else{
            Axios.get(token.getLink()+"/api/v4/projects/31/issues?state=opened&labels=Ventspils_Support&author_username="+owner+"&assignee_username="+developer+"&access_token=" +token.get()).then((res) =>{
                setSupportTickets(res.data);
            });
        }
    }

    function fetchDeveloperTickets(typeValue, owner, developer){
        if(owner === "" && developer === ""){
            Axios.get(token.getLink()+"/api/v4/projects/31/issues?state=opened&labels="+typeValue+"&assignee_username=lauris.dukalskis&access_token=" +token.get()).then((res) =>{
                setLaurisTickets(res.data);
            });
            Axios.get(token.getLink()+"/api/v4/projects/31/issues?state=opened&labels="+typeValue+"&assignee_username=janis.dzalbs&access_token=" +token.get()).then((res) =>{
                setJanisTickets(res.data);
            });
            Axios.get(token.getLink()+"/api/v4/projects/31/issues?state=opened&labels="+typeValue+"&assignee_username=danils.grics&access_token=" +token.get()).then((res) =>{
                setDanilsTickets(res.data);
            });
            Axios.get(token.getLink()+"/api/v4/projects/31/issues?state=opened&labels="+typeValue+"&assignee_username=marcis.arajums&access_token=" +token.get()).then((res) =>{
                setMarcisTickets(res.data);
            });
            Axios.get(token.getLink()+"/api/v4/projects/31/issues?state=opened&labels="+typeValue+"&assignee_username=Davis.Vetra&access_token=" +token.get()).then((res) =>{
                setDavisTickets(res.data);
            });
            Axios.get(token.getLink()+"/api/v4/projects/31/issues?state=opened&labels="+typeValue+"&assignee_id=None&access_token=" +token.get()).then((res) =>{
                setOpenData(res.data);
            });
        }
        else if(owner !== "" && developer === ""){
            Axios.get(token.getLink()+"/api/v4/projects/31/issues?state=opened&labels="+typeValue+"&author_username="+owner+"&assignee_username=lauris.dukalskis&access_token=" +token.get()).then((res) =>{
                setLaurisTickets(res.data);
            });
            Axios.get(token.getLink()+"/api/v4/projects/31/issues?state=opened&labels="+typeValue+"&author_username="+owner+"&assignee_username=janis.dzalbs&access_token=" +token.get()).then((res) =>{
                setJanisTickets(res.data);
            });
            Axios.get(token.getLink()+"/api/v4/projects/31/issues?state=opened&labels="+typeValue+"&author_username="+owner+"&assignee_username=danils.grics&access_token=" +token.get()).then((res) =>{
                setDanilsTickets(res.data);
            });
            Axios.get(token.getLink()+"/api/v4/projects/31/issues?state=opened&labels="+typeValue+"&author_username="+owner+"&assignee_username=marcis.arajums&access_token=" +token.get()).then((res) =>{
                setMarcisTickets(res.data);
            });
            Axios.get(token.getLink()+"/api/v4/projects/31/issues?state=opened&labels="+typeValue+"&author_username="+owner+"&assignee_username=Davis.Vetra&access_token=" +token.get()).then((res) =>{
                setDavisTickets(res.data);
            });
            Axios.get(token.getLink()+"/api/v4/projects/31/issues?state=opened&labels="+typeValue+"&author_username="+owner+"&assignee_id=None&access_token=" +token.get()).then((res) =>{
                setOpenData(res.data);
            });
        }
        else if(owner === "" && developer !== ""){
            Axios.get(token.getLink()+"/api/v4/projects/31/issues?state=opened&labels="+typeValue+"&assignee_username="+developer+"&access_token=" +token.get()).then((res) =>{
                setDeveloperTickets(res.data);
            });
        }
        else{
            Axios.get(token.getLink()+"/api/v4/projects/31/issues?state=opened&labels="+typeValue+"&author_username="+owner+"&assignee_username="+developer+"&access_token=" +token.get()).then((res) =>{
                setDeveloperTickets(res.data);
            });
        }
    }

    function fetchUsers(){
        Axios.get(token.getLink()+"/api/v4/users?per_page=100&access_token="+token.get()).then((res) =>{
            setUsers(res.data);
        });
    }

    const triggers = document.querySelectorAll('li.filter-trigger');

    function clearActive() {
    var activeLink = document.querySelector('.active');
    activeLink.classList.remove("active");
    }

    triggers.forEach(element => {
    element.addEventListener('click', function() {
        clearActive();
        element.classList.add('active');
    })
    });

    return (
        <div className="App">
            <div className="sidebar">
                <h2>Filter</h2>
                <ul className="navbar">
                    <li className="active reset filter-trigger" onClick={() => setNavBarValue('developer')}>Developer</li>
                    <li className="filter-trigger" onClick={() => setNavBarValue('support')}>Support</li>
                </ul>
                <Dropdown
                    label="Ticket type:"
                    options={typeOptions}
                    value={typeValue}
                    onChange={handleChange}
                    navBarValue={navBarValue}
                />
                <div className="ownerFilter" style={{marginTop: 100}}>
                    <label>
                        Owner: 
                    </label>
                    <input type="text" className="col-md-12 input"
                        onChange={e => handleOwnerChange(e.target.value)}
                        value={owner}
                    />
                    {suggestionsOwner && suggestionsOwner.map((suggestion, i)=>
                    <div key={i} className="suggestion col-md-12 justify-content-md-center"
                        onClick={() => onSuggestOwnerHandler(suggestion.username)}
                    >{suggestion.username}</div>
                    )}
                    <button onClick={handleResetOwner}>Reset</button>
                    <button onClick={handleSearchOwner}>Search</button>
                </div>
                <div className="developerFilter" style={{marginTop: 100}}>
                    <label>
                        Developer: 
                    </label>
                    <input type="text" className="col-md-12 input"
                        onChange={e => handleDeveloperChange(e.target.value)}
                        value={developer}
                    />
                    {suggestionsDeveloper && suggestionsDeveloper.map((suggestion, i)=>
                    <div key={i} className="suggestion col-md-12 justify-content-md-center"
                        onClick={() => onSuggestDeveloperHandler(suggestion.username)}
                    >{suggestion.username}</div>
                    )}
                    <button onClick={handleResetDeveloper}>Reset</button>
                    <button onClick={handleSearchDeveloper}>Search</button>
                </div>
            </div>
            <div>
                {tableSelection(navBarValue, token, openData, janisTickets, danilsTickets, laurisTickets, marcisTickets, davisTickets, developerTickets, konstantinsTickets, eduardsTickets, edgarsTickets, supportTickets)}
            </div>
        </div>
        );
    };

const Dropdown = ({ label, value, options, onChange, navBarValue }) => {

    if(navBarValue === "developer"){
        return (
            <label>
                {label}
                <select value={value} onChange={onChange}>
                    {options.map((option) => (
                    <option key={option.value} value={option.value}>{option.label}</option>
                    ))}
                </select>
            </label>
        );
    }
    return null;
}

//Functions

function getAssigneesName(assignees){
    if(assignees != null){
        if(assignees.length === 1){
            return assignees[0].name;
        }

        let developer = "";
        for(let i = 0; i < assignees.length; i++){
            developer += assignees[i].name;
            if(i+1 < assignees.length){
                developer += "; ";
            }
        }
        return developer;
    }
    return null;
}

function getType(ticket){
    if(ticket != null){
        for(let i = 0; i < ticket.length; i++){
            if(ticket[i] === "Ventspils_Internal"){
                return "Internal";
            }
            if(ticket[i] === "Ventspils_Support"){
                return "Support";
            }
        }
    }
    return null;
}

function getStatus(labels){
    if(labels != null){
        for(let i = 0; i < labels.length; i++){
            if(labels[i] === "Ventspils::Input_Required"){
                return "Input Required";
            }
            if(labels[i] === "Ventspils::WIP"){
                return "WIP";
            }
            if(labels[i] === "Ventspils::Review"){
                return "Review";
            }
            if(labels[i] === "Ventspils::Deploy"){
                return "Deploy";
            }
            if(labels[i] === "Ventspils::Monitoring_Daily"){
                return "Monitoring_Daily";
            }
            if(labels[i] === "Ventspils::Monitoring"){
                return "Monitoring";
            }
        }
        return "Open";
    }
    return null;
}

function getIssueLink(token, ticket){
    return token.getLink()+"/Ediex/hermes/-/issues/" +ticket.iid;
}

function getPriority(labels){
    if(labels != null){
        for(let i = 0; i < labels.length; i++){
            if(labels[i] === "priority::critical"){
                return "Critical";
            }
            if(labels[i] === "priority::high"){
                return "High";
            }
        }
        return "Low";
    }
    return null;
}

function getCreationDate(creationDate){
    if(creationDate != null){
        return creationDate.slice(0, creationDate.indexOf("T"));
    }
    return null;
}

function getEstimate(weight){
    if(weight != null){
        return weight * 0.5 + " h";
    }
    return null;
}

function tableSelection(navBarValue, token, openData, janisTickets, danilsTickets, laurisTickets, marcisTickets, davisTickets, developerTickets, konstantinsTickets, eduardsTickets, edgarsTickets, supportTickets){
    if(navBarValue === "developer" && developerTickets !== ''){
        return(
        <div className="tableContainer">
            {createTable(developerTickets, token, "Developer")}
        </div>
        );
    }
    else if(navBarValue === "developer"){
        return(
        <div className="tableContainer">
            {createTable(openData, token, "Open")}
            {createTable(janisTickets, token, "Janis")}
            {createTable(danilsTickets, token, "Danils")}
            {createTable(laurisTickets, token, "Lauris")}
            {createTable(marcisTickets, token, "Marcis")}
            {createTable(davisTickets, token, "Davis")}
            {createTable(developerTickets, token, "Developer")}
        </div>
        );
    }
    
    else if(navBarValue === "support" && supportTickets !== ""){
        return(
        <div className="tableContainer">
            {createTable(supportTickets, token, "Support")}
        </div>
        );
    }
    else{
        return(
            <div className="tableContainer">
                {createTable(konstantinsTickets, token, "Konstantins")}
                {createTable(eduardsTickets, token, "Eduards")}
                {createTable(edgarsTickets, token, "Edgars")}
                {createTable(supportTickets, token, "Support")}
            </div>
        );
    }
}

function createTable(ticketData, token, caption){
    if(ticketData?.length){
        return(
            <div className="Table">
                <table>
                    <caption>{caption}</caption>
                    <tbody>
                        <tr>
                            <th>Task</th>
                            <th>Owner</th>
                            <th>Developer</th>
                            <th>Type</th>
                            <th>Priority</th>
                            <th>Status</th>
                            <th>Creation date</th>
                            <th>Due date</th>
                            <th>Estimate</th>
                        </tr>
                        {ticketData && ticketData.map(userData => {
                            return(
                                <tr key = {userData.id}>
                                    <td><a href={getIssueLink(token, userData)}>{userData.title}</a></td> 
                                    <td>{userData.author.name}</td>
                                    <td>{getAssigneesName(userData.assignees)}</td>
                                    <td>{getType(userData.labels)}</td>
                                    <td>{getPriority(userData.labels)}</td>
                                    <td>{getStatus(userData.labels)}</td>
                                    <td>{getCreationDate(userData.created_at)}</td>
                                    <td>{(userData.due_date)}</td>
                                    <td>{getEstimate(userData.weight)}</td>
                                </tr>
                            )
                        })}
                    </tbody>
                </table>
            </div>
        );
    }
    return null;
}

export default App;