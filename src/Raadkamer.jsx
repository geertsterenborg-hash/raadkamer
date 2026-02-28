import React, { useState } from 'react';

export default function Raadkamer() {
  const [stage, setStage] = useState('intro');
  const [topic, setTopic] = useState('');
  const [goal, setGoal] = useState('');
  const [context, setContext] = useState('');
  const [synthesis, setSynthesis] = useState('');
  const [experts, setExperts] = useState([]);
  const [expertName, setExpertName] = useState('');
  const [expertEra, setExpertEra] = useState('');
  const [expertPerspective, setExpertPerspective] = useState('');

  function addExpert() {
    if (expertName && expertPerspective) {
      setExperts([...experts, {
        id: Date.now(),
        name: expertName,
        era: expertEra,
        perspective: expertPerspective
      }]);
      setExpertName('');
      setExpertEra('');
      setExpertPerspective('');
    }
  }

  function removeExpert(id) {
    setExperts(experts.filter(e => e.id !== id));
  }

  function generatePrompt() {
    var expertText = experts.map(function(e, i) {
      return (i+1) + '. ' + e.name + (e.era ? ' (' + e.era + ')' : '') + '\n' + e.perspective;
    }).join('\n\n');

    return '# Raadkamer Prompt\n\n## Vraagstuk\n' + topic + '\n\n## Context\n' + context + '\n\n## Doel\n' + goal + '\n\n## Experts\n' + expertText + '\n\n## Synthese\n' + synthesis + '\n\n---\nGegenereerd via de Raadkamer methode';
  }

  // Footer component
  const Footer = () => (
    <div style={{
      marginTop: '40px',
      paddingTop: '20px',
      borderTop: '1px solid #e5e7eb',
      textAlign: 'center',
      fontSize: '13px',
      color: '#6b7280'
    }}>
      <p style={{margin: '8px 0'}}>
        Powered by <a href="https://claude.ai" target="_blank" rel="noopener noreferrer" style={{color: '#1e40af', textDecoration: 'none'}}>Claude AI</a>
      </p>
      <p style={{margin: '8px 0', fontSize: '12px'}}>
        © {new Date().getFullYear()} De Raadkamer • Geïnspireerd door DeLevenTV
      </p>
    </div>
  );

  var s = {
    page: {maxWidth:'700px', margin:'40px auto', padding:'20px', fontFamily:'Arial'},
    h1: {color:'#1e40af'},
    input: {width:'100%', padding:'8px', marginTop:'4px', marginBottom:'12px', fontSize:'14px', boxSizing:'border-box'},
    textarea: {width:'100%', padding:'8px', marginTop:'4px', marginBottom:'12px', fontSize:'14px', boxSizing:'border-box', height:'80px'},
    btnBlue: {padding:'10px 20px', background:'#1e40af', color:'white', border:'none', borderRadius:'6px', cursor:'pointer', fontSize:'14px'},
    btnGray: {padding:'10px 20px', background:'#ccc', color:'white', border:'none', borderRadius:'6px', cursor:'not-allowed', fontSize:'14px'},
    btnWhite: {padding:'10px 20px', border:'1px solid #ccc', borderRadius:'6px', cursor:'pointer', background:'white'},
    btnGreen: {width:'100%', padding:'10px', background:'#16a34a', color:'white', border:'none', borderRadius:'6px', cursor:'pointer', fontSize:'14px'},
    btnGreenDis: {width:'100%', padding:'10px', background:'#ccc', color:'white', border:'none', borderRadius:'6px', cursor:'not-allowed', fontSize:'14px'},
    label: {display:'block', fontWeight:'bold', fontSize:'14px'},
    box: {background:'#eff6ff', padding:'20px', borderRadius:'8px', marginBottom:'20px'},
    row: {marginTop:'24px', display:'flex', gap:'12px'}
  };

  if (stage === 'intro') {
    return (
      <div style={s.page}>
        <h1 style={s.h1}>De Raadkamer</h1>
        <p>Verken complexe vraagstukken met de wijsheid van experts door de tijd.</p>
        <div style={s.box}>
          <p><strong>Stap 1:</strong> Formuleer je vraagstuk</p>
          <p><strong>Stap 2:</strong> Voeg experts toe (minimaal 2)</p>
          <p><strong>Stap 3:</strong> Schrijf je synthese</p>
          <p><strong>Stap 4:</strong> Kopieer je prompt</p>
        </div>
        <button style={s.btnBlue} onClick={function() { setStage('question'); }}>
          Begin de Raadkamer
        </button>
        <Footer />
      </div>
    );
  }

  if (stage === 'question') {
    return (
      <div style={s.page}>
        <h1 style={s.h1}>Stap 1: Jouw Vraagstuk</h1>
        <label style={s.label}>Kernvraag *</label>
        <textarea style={s.textarea} value={topic} onChange={function(e) { setTopic(e.target.value); }} placeholder="Wat is je vraag of probleem?" />
        <label style={s.label}>Context (optioneel)</label>
        <textarea style={s.textarea} value={context} onChange={function(e) { setContext(e.target.value); }} placeholder="Achtergrond en situatie..." />
        <label style={s.label}>Doel *</label>
        <textarea style={s.textarea} value={goal} onChange={function(e) { setGoal(e.target.value); }} placeholder="Wat wil je bereiken?" />
        <div style={s.row}>
          <button style={s.btnWhite} onClick={function() { setStage('intro'); }}>Terug</button>
          <button style={topic && goal ? s.btnBlue : s.btnGray} onClick={function() { if (topic && goal) setStage('experts'); }}>
            Volgende: Experts
          </button>
        </div>
        <Footer />
      </div>
    );
  }

  if (stage === 'experts') {
    return (
      <div style={s.page}>
        <h1 style={s.h1}>Stap 2: Experts ({experts.length} toegevoegd)</h1>
        <p style={{color:'#666'}}>Minimaal 2 experts nodig om door te gaan.</p>

        {experts.map(function(expert) {
          return (
            <div key={expert.id} style={{background:'#f0fdf4', border:'1px solid #86efac', padding:'12px', borderRadius:'8px', marginBottom:'8px'}}>
              <div style={{display:'flex', justifyContent:'space-between'}}>
                <strong>{expert.name} {expert.era ? '(' + expert.era + ')' : ''}</strong>
                <button onClick={function() { removeExpert(expert.id); }} style={{background:'none', border:'none', color:'#dc2626', cursor:'pointer', fontSize:'18px'}}>X</button>
              </div>
              <p style={{margin:'4px 0 0', fontSize:'14px'}}>{expert.perspective}</p>
            </div>
          );
        })}

        <div style={{background:'#f9fafb', border:'2px dashed #ccc', padding:'16px', borderRadius:'8px', marginTop:'16px'}}>
          <h4>Voeg expert toe:</h4>
          <label style={s.label}>Naam *</label>
          <input type="text" style={s.input} value={expertName} onChange={function(e) { setExpertName(e.target.value); }} placeholder="Bijv: Peter Drucker" />
          <label style={s.label}>Tijdperk (optioneel)</label>
          <input type="text" style={s.input} value={expertEra} onChange={function(e) { setExpertEra(e.target.value); }} placeholder="Bijv: 1909-2005" />
          <label style={s.label}>Perspectief *</label>
          <textarea style={s.textarea} value={expertPerspective} onChange={function(e) { setExpertPerspective(e.target.value); }} placeholder="Wat is hun expertise?" />
          <button style={expertName && expertPerspective ? s.btnGreen : s.btnGreenDis} onClick={addExpert}>
            Voeg toe aan Raadkamer
          </button>
        </div>

        <div style={s.row}>
          <button style={s.btnWhite} onClick={function() { setStage('question'); }}>Terug</button>
          <button style={experts.length >= 2 ? s.btnBlue : s.btnGray} onClick={function() { if (experts.length >= 2) setStage('synthesis'); }}>
            Volgende: Synthese ({experts.length}/2)
          </button>
        </div>
        <Footer />
      </div>
    );
  }

  if (stage === 'synthesis') {
    return (
      <div style={s.page}>
        <h1 style={s.h1}>Stap 3: Synthese</h1>
        <div style={{background:'#f0f9ff', padding:'12px', borderRadius:'8px', marginBottom:'16px'}}>
          <strong>Jouw experts:</strong>
          {experts.map(function(e, i) {
            return <p key={e.id} style={{margin:'4px 0', fontSize:'14px'}}>{i+1}. <strong>{e.name}</strong></p>;
          })}
        </div>
        <label style={s.label}>Synthese & Verfijnde Vraag *</label>
        <textarea style={{...s.textarea, height:'120px'}} value={synthesis} onChange={function(e) { setSynthesis(e.target.value); }} placeholder="Wat zijn de rode draden? Wat is je verfijnde vraag?" />
        <div style={s.row}>
          <button style={s.btnWhite} onClick={function() { setStage('experts'); }}>Terug</button>
          <button style={synthesis ? s.btnBlue : s.btnGray} onClick={function() { if (synthesis) setStage('export'); }}>
            Bekijk Prompt
          </button>
        </div>
        <Footer />
      </div>
    );
  }

  if (stage === 'export') {
    return (
      <div style={s.page}>
        <h1 style={s.h1}>Jouw Prompt is Klaar!</h1>
        <div style={{background:'#f9fafb', border:'1px solid #ccc', padding:'16px', borderRadius:'8px', maxHeight:'400px', overflowY:'auto'}}>
          <pre style={{whiteSpace:'pre-wrap', fontSize:'13px', margin:0}}>{generatePrompt()}</pre>
        </div>
        <div style={s.row}>
          <button style={s.btnWhite} onClick={function() { setStage('synthesis'); }}>Terug</button>
          <button style={{...s.btnBlue, flex:1}} onClick={function() { navigator.clipboard.writeText(generatePrompt()); alert('Gekopieerd!'); }}>
            Kopieer naar Klembord
          </button>
        </div>
        <div style={{textAlign:'center', marginTop:'16px'}}>
          <button onClick={function() { setStage('intro'); setTopic(''); setGoal(''); setContext(''); setSynthesis(''); setExperts([]); }} style={{background:'none', border:'none', color:'#1e40af', cursor:'pointer', textDecoration:'underline'}}>
            Nieuwe sessie starten
          </button>
        </div>
        <Footer />
      </div>
    );
  }

  return null;
}