
/* Presentation layer. Original workout definitions and storage keys stay intact. */
const gcText={
 ru:{settings:'Настройки',export:'Сохранить копию данных',local:'История и веса хранятся в этом браузере.',
 kicker:'Твой личный план в зале',title:'Твой план.',title2:'Твой прогресс.',
 description:'Три основные тренировки — всегда под рукой. Ещё шесть — когда захочется разнообразия.',
 choose:'Выбрать тренировку ↗',resume:'Продолжить тренировку →',week:'ТВОЯ НЕДЕЛЯ',workouts:'тренировок',
 step:'Прогресс начинается с первого подхода.',routine:'ТВОЙ РИТМ',primary:'Основная программа',
 extra:'Хочется разнообразия?',extraCount:'Ещё 6 тренировок',footer:'Меньше лишнего. Больше внимания тренировке.',
 session:'ВРЕМЯ ДЛЯ СЕБЯ',sessionNote:'Один подход за другим. В своём темпе.',
 orderHelp:'Меняй порядок перетаскиванием или кнопками ↑ ↓',home:'Тренировки',history:'История',stats:'Прогресс',advice:'Советы',
 notes:'Техника и подсказки',up:'Переместить выше',down:'Переместить ниже',grip:'Перетащи упражнение',
 save:'Сохранить',cancel:'Отмена',weightTitle:'Рабочий вес',weight:'Вес, кг',weight2:'Второй вес, кг',
 invalid:'Введи число от 0 до 1000.',done:'отмечено',empty:'Здесь появится твой прогресс.',
 emptyNote:'Заверши первую тренировку — и мы сохраним её здесь.',count:'Тренировок',sets:'Подходов',
 time:'Всего минут',avg:'В среднем, минут',start:'Начать',total:'За всё время'},
 en:{settings:'Settings',export:'Export your data',local:'Your history and weights are saved in this browser.',
 kicker:'Your personal gym plan',title:'Your plan.',title2:'Your progress.',
 description:'Your three main workouts, always within reach. Six more for when you want something different.',
 choose:'Choose a workout ↗',resume:'Resume workout →',week:'YOUR WEEK',workouts:'workouts',
 step:'Progress starts with your first set.',routine:'YOUR ROUTINE',primary:'Main program',
 extra:'Ready for a change?',extraCount:'6 more workouts',footer:'Less distraction. More focus on your workout.',
 session:'TIME FOR YOURSELF',sessionNote:'One set at a time. At your own pace.',
 orderHelp:'Drag exercises or use the ↑ ↓ buttons',home:'Workouts',history:'History',stats:'Progress',advice:'Advice',
 notes:'Technique & notes',up:'Move up',down:'Move down',grip:'Drag exercise',
 save:'Save',cancel:'Cancel',weightTitle:'Working weight',weight:'Weight, kg',weight2:'Second weight, kg',
 invalid:'Enter a number between 0 and 1000.',done:'completed',empty:'Your progress will appear here.',
 emptyNote:'Complete your first workout to start your history.',count:'Workouts',sets:'Sets',
 time:'Total minutes',avg:'Average minutes',start:'Start',total:'All time'}
};
function gcT(k){return gcText[currentLanguage==='en'?'en':'ru'][k]||k;}
function gcEl(tag,cls,text){const e=document.createElement(tag);if(cls)e.className=cls;if(text!==undefined)e.textContent=text;return e;}
function gcCopy(){
 document.documentElement.lang=currentLanguage;
 document.querySelectorAll('[data-gc]').forEach(e=>e.textContent=gcT(e.dataset.gc));
 const names={gcHomeBtn:'home',historyBtn:'history',statsBtn:'stats',adviceBtn:'advice'};
 Object.entries(names).forEach(([id,k])=>document.getElementById(id).textContent=gcT(k));
 document.querySelectorAll('.workout-card').forEach(card=>{
  const id=Number(card.dataset.workout),w=workouts[id],small=matchMedia('(max-width:800px)').matches;
  card.querySelector('.workout-header h2').textContent=String(id).padStart(2,'0')+' / '+(currentLanguage==='en'?'WORKOUT':'ТРЕНИРОВКА');
  const b=card.querySelector('.start-btn');
  b.textContent=small?'↗':gcT('start')+' ↗';b.setAttribute('aria-label',gcT('start')+': '+(currentLanguage==='en'?w.nameEn||w.name:w.name));
  const span=card.querySelector('.workout-info span');
  span.textContent=w.exercises.length+(currentLanguage==='en'?' exercises':' упражнений');
 });
 document.querySelector('#historyScreen .screen-header h2').textContent=gcT('history');
 document.querySelector('#statsScreen .screen-header h2').textContent=gcT('stats');
 document.querySelector('#adviceScreen .screen-header h2').textContent=gcT('advice');
 document.getElementById('backBtn').textContent=currentLanguage==='en'?'← Exit':'← Выйти';
 document.getElementById('finishBtn').textContent=currentLanguage==='en'?'Finish ✓':'Завершить ✓';
 document.getElementById('clearHistoryBtn').textContent=currentLanguage==='en'?'Clear':'Очистить';
 document.querySelectorAll('.back-to-main').forEach(b=>b.textContent=currentLanguage==='en'?'← Back':'← Назад');
 document.getElementById('gcResume').hidden=!currentWorkout;
 if(currentWorkout){
  const w=workouts[currentWorkout];
  document.getElementById('gcSessionTitle').textContent=(currentLanguage==='en'?w.nameEn||w.name:w.name).replace(/^.*?:\s*/,'');
 }
 gcWeek();gcProgress();
}
function gcWeek(){
 const history=getWorkoutHistory(),now=new Date(),monday=new Date(now);
 monday.setHours(0,0,0,0);monday.setDate(monday.getDate()-((monday.getDay()+6)%7));
 const end=new Date(monday);end.setDate(end.getDate()+7);
 const week=history.filter(h=>new Date(h.date)>=monday&&new Date(h.date)<end);
 document.getElementById('gcWeekCount').textContent=week.length;
 const dayKey=d=>[d.getFullYear(),d.getMonth(),d.getDate()].join('-');
 const active=new Set(week.map(h=>dayKey(new Date(h.date))));
 const loc=currentLanguage==='en'?'en-US':'ru-RU',sunday=new Date(end);sunday.setDate(sunday.getDate()-1);
 document.getElementById('gcWeekRange').textContent=monday.toLocaleDateString(loc,{day:'numeric',month:'short'})+' — '+sunday.toLocaleDateString(loc,{day:'numeric',month:'short'});
 const days=document.getElementById('gcWeekDays');days.replaceChildren();
 for(let n=0;n<7;n++){
  const d=new Date(monday);d.setDate(d.getDate()+n);
  const done=active.has(dayKey(d)),isToday=dayKey(d)===dayKey(now);
  const el=gcEl('div','gc-day'+(done?' gc-done':'')+(isToday?' gc-today':''));
  el.append(gcEl('i','',done?'✓':String(d.getDate())),gcEl('span','',d.toLocaleDateString(loc,{weekday:'short'})));
  el.setAttribute('aria-label',d.toLocaleDateString(loc)+(done?' — '+gcT('done'):''));
  days.append(el);
 }
}
function gcProgress(){
 const items=[...document.querySelectorAll('#exercisesList .set-checkbox')],count=items.filter(e=>e.checked).length;
 document.getElementById('gcProgressText').textContent=`${String(count).padStart(2,'0')} / ${items.length} ${gcT('done')}`;
 document.getElementById('gcProgressBar').style.width=(items.length?count/items.length*100:0)+'%';
}
function gcGroups(){
 const groups=[],seen=new Set(),order=exerciseOrder[currentWorkout]||[];
 order.forEach(i=>{if(seen.has(i))return;const pair=supersets[i];const group=[i];seen.add(i);if(pair!==undefined&&!seen.has(pair)){group.push(pair);seen.add(pair)}groups.push(group)});
 return groups;
}
function gcMove(i,dir){
 const groups=gcGroups(),pos=groups.findIndex(g=>g.includes(i)),target=pos+dir;
 if(pos<0||target<0||target>=groups.length)return;
 [groups[pos],groups[target]]=[groups[target],groups[pos]];
 exerciseOrder[currentWorkout]=groups.flat();renderExercises(workouts[currentWorkout]);
 document.getElementById('exercise-'+i)?.scrollIntoView({block:'nearest'});
}
function gcMoveTo(i,target){
 const groups=gcGroups(),a=groups.findIndex(g=>g.includes(i)),b=groups.findIndex(g=>g.includes(target));
 if(a<0||b<0||a===b)return;
 [groups[a],groups[b]]=[groups[b],groups[a]];
 exerciseOrder[currentWorkout]=groups.flat();renderExercises(workouts[currentWorkout]);
}
function gcDecorate(){
 document.querySelectorAll('.exercise-card').forEach((card,n)=>{
  if(card.querySelector('.gc-order'))return;
  const i=Number(card.dataset.exerciseIndex),header=card.querySelector('.exercise-header'),title=card.querySelector('.exercise-title');
  const row=gcEl('div','gc-order'),grip=gcEl('span','gc-grip','⠿');
  grip.title=gcT('grip');grip.setAttribute('aria-hidden','true');
  row.append(grip,gcEl('span','',String(n+1).padStart(2,'0')));
  const groups=gcGroups(),pos=groups.findIndex(g=>g.includes(i));
  [-1,1].forEach(dir=>{
   const b=gcEl('button','',dir<0?'↑':'↓');b.type='button';b.title=gcT(dir<0?'up':'down');b.setAttribute('aria-label',b.title);
   b.disabled=dir<0?pos===0:pos===groups.length-1;b.onclick=()=>gcMove(i,dir);row.append(b);
  });
  header.prepend(row);
  const notes=[...title.querySelectorAll('.exercise-note,.exercise-technique')];
  if(notes.length){
   const details=gcEl('details','gc-notes');details.append(gcEl('summary','',gcT('notes')));
   notes.forEach(x=>details.append(x));title.append(details);
  }
  card.querySelectorAll('.reps-btn').forEach(b=>b.setAttribute('aria-label',(b.classList.contains('minus')?'− ':'+ ')+(currentLanguage==='en'?'Repetitions':'Повторения')));
 });
 gcCopy();
}
function gcOnScreen(id){
 const map={mainScreen:'gcHomeBtn',workoutScreen:'gcHomeBtn',historyScreen:'historyBtn',summaryScreen:'historyBtn',statsScreen:'statsBtn',adviceScreen:'adviceBtn'};
 document.querySelectorAll('.header-buttons .btn').forEach(b=>{
  b.classList.toggle('gc-active',map[id]===b.id);
  if(map[id]===b.id)b.setAttribute('aria-current','page');else b.removeAttribute('aria-current');
 });
 document.querySelector('.gc-settings').open=false;
 gcCopy();
 window.scrollTo(0,0);
}
function gcDialog(modal){
 if(!modal)return;
 const pane=modal.querySelector('.superset-modal-content'),previous=document.activeElement;
 pane.setAttribute('role','dialog');pane.setAttribute('aria-modal','true');
 pane.setAttribute('aria-label',pane.querySelector('h3')?.textContent||gcT('settings'));
 modal.querySelectorAll('.superset-option').forEach(e=>{
  e.tabIndex=0;e.setAttribute('role','button');
  e.addEventListener('keydown',ev=>{if(ev.key==='Enter'||ev.key===' '){ev.preventDefault();e.click()}});
 });
 const close=()=>{modal.remove();previous?.focus()};
 modal.addEventListener('click',ev=>{if(ev.target===modal)close()});
 modal.addEventListener('keydown',ev=>{
  if(ev.key==='Escape'){ev.preventDefault();close();return}
  if(ev.key!=='Tab')return;
  const els=[...pane.querySelectorAll('button,input,[tabindex="0"]')].filter(e=>!e.disabled);
  if(!els.length)return;
  if(ev.shiftKey&&document.activeElement===els[0]){ev.preventDefault();els.at(-1).focus()}
  else if(!ev.shiftKey&&document.activeElement===els.at(-1)){ev.preventDefault();els[0].focus()}
 });
 requestAnimationFrame(()=>pane.querySelector('input,button,[tabindex="0"]')?.focus());
}
const gcOriginalSuperset=openSupersetModal,gcOriginalAlternative=openAlternativeModal;
openSupersetModal=function(i,e){gcOriginalSuperset(i,e);gcDialog(document.getElementById('supersetModal'))};
openAlternativeModal=function(i,e){gcOriginalAlternative(i,e);gcDialog(document.getElementById('alternativeModal'))};
openWeightModal=function(i,exercise){
 const weights=getExerciseWeight(currentWorkout,i),modal=gcEl('div','superset-modal active');
 modal.id='gcWeightModal';
 const pane=gcEl('div','superset-modal-content'),form=gcEl('form','gc-weight-form');
 pane.append(gcEl('h3','',gcT('weightTitle')),gcEl('p','',getExerciseName(exercise)));
 const inputs=[];
 [weights.weight,...(exercise.isDual&&weights.weight2!==null?[weights.weight2]:[])].forEach((value,n)=>{
  const label=gcEl('label','',gcT(n?'weight2':'weight'));
  const input=gcEl('input','gc-weight-input');input.id='gcWeight'+n;input.type='text';input.inputMode='decimal';input.required=true;input.value=Math.abs(value||0);
  label.append(input);form.append(label);inputs.push(input);
 });
 const error=gcEl('p','gc-error');error.setAttribute('role','alert');form.append(error);
 const actions=gcEl('div','gc-modal-actions'),save=gcEl('button','btn btn-primary',gcT('save')),cancel=gcEl('button','btn btn-secondary',gcT('cancel'));
 save.type='submit';cancel.type='button';cancel.onclick=()=>modal.remove();actions.append(save,cancel);form.append(actions);
 form.onsubmit=ev=>{
  ev.preventDefault();const values=inputs.map(e=>Number(e.value.trim().replace(',','.')));
  if(values.some((v,n)=>!Number.isFinite(v)||v<0||v>1000||!inputs[n].value.trim())){error.textContent=gcT('invalid');return}
  const sign=weights.weight<0?-1:1;
  updateExerciseWeight(currentWorkout,i,sign*values[0],values.length>1?values[1]:weights.weight2);
  modal.remove();renderExercises(workouts[currentWorkout]);
 };
 pane.append(form);modal.append(pane);document.body.append(modal);gcDialog(modal);
};
function gcEmpty(container){
 const box=gcEl('div','stat-card');box.style.gridColumn='1 / -1';
 box.append(gcEl('h3','',gcT('empty')),gcEl('p','gc-settings-note',gcT('emptyNote')));container.append(box);
}
loadHistory=function(){
 const box=document.getElementById('historyList'),history=getWorkoutHistory();box.replaceChildren();
 if(!history.length){gcEmpty(box);return}
 history.forEach(item=>{
  const card=gcEl('article','history-item'),head=gcEl('div','history-header');
  head.append(gcEl('h3','',(currentLanguage==='en'?item.workoutNameEn||item.workoutName:item.workoutName)||'Workout'));
  head.append(gcEl('span','history-date',new Date(item.date).toLocaleDateString(currentLanguage==='en'?'en-US':'ru-RU',{day:'numeric',month:'long',year:'numeric'})));
  const stats=gcEl('div','history-stats');
  stats.append(gcEl('span','',formatTime(item.duration||0)),gcEl('span','',`${item.completedSets||0} / ${item.totalSets||0} ${currentLanguage==='en'?'sets':'подходов'}`));
  stats.append(gcEl('span','',(item.totalWeight||0).toLocaleString()+(currentLanguage==='en'?' kg':' кг')));
  const button=gcEl('button','btn btn-secondary btn-small',currentLanguage==='en'?'View →':'Подробнее →');
  button.onclick=()=>showHistoryItemSummary(item);button.style.marginTop='15px';
  card.append(head,stats,button);box.append(card);
 });
};
loadStats=function(){
 const box=document.getElementById('statsContent'),history=getWorkoutHistory();box.replaceChildren();
 if(!history.length){gcEmpty(box);return}
 const seconds=history.reduce((n,h)=>n+(h.duration||0),0);
 const stats=[[gcT('count'),history.length],[gcT('time'),Math.round(seconds/60)],[gcT('avg'),Math.round(seconds/history.length/60)],[gcT('sets'),history.reduce((n,h)=>n+(h.completedSets||0),0)]];
 for(let id=1;id<=9;id++){
  const count=history.filter(h=>h.workoutId===id).length;
  if(id<=3||count)stats.push([(currentLanguage==='en'?'Workout ':'Тренировка ')+id,count]);
 }
 stats.forEach(([label,num])=>{
  const card=gcEl('div','stat-card');card.append(gcEl('h3','',label),gcEl('div','stat-value',String(num)),gcEl('span','stat-label',gcT('total')));box.append(card);
 });
};
function gcExport(){
 const keys=['workoutHistory','exerciseWeights','alternatives','language','theme'],data={};
 keys.forEach(k=>{const value=appStorage.getItem(k);if(value!==null)data[k]=value});
 const blob=new Blob([JSON.stringify({format:'gymcoach-backup-v1',exported:new Date().toISOString(),data},null,2)],{type:'application/json'});
 const url=URL.createObjectURL(blob),a=document.createElement('a');
 a.href=url;a.download='GymCoach_Backup.json';a.click();setTimeout(()=>URL.revokeObjectURL(url),3000);
}
document.addEventListener('gc:render',gcDecorate);
document.addEventListener('gc:screen',e=>gcOnScreen(e.detail));
document.addEventListener('DOMContentLoaded',()=>{
 // Shorter labels, retaining the original translation mechanism.
 Object.assign(translations.ru,{changeWeight:'Вес',superset:'+ Суперсет',alternative:'Замена',warmupLabel:'Разминка'});
 Object.assign(translations.en,{changeWeight:'Weight',superset:'+ Superset',alternative:'Replace',warmupLabel:'Warm-up'});
 document.getElementById('gcHomeBtn').onclick=()=>showScreen('mainScreen');
 document.getElementById('gcChoose').onclick=()=>document.getElementById('gcPrograms').scrollIntoView({behavior:'smooth',block:'start'});
 document.getElementById('gcResume').onclick=()=>{if(currentWorkout)showScreen('workoutScreen')};
 document.getElementById('gcExport').onclick=gcExport;
 document.getElementById('exercisesList').addEventListener('change',gcProgress);
 document.getElementById('languageToggle').addEventListener('change',()=>{
  if(currentWorkout&&!document.getElementById('workoutScreen').classList.contains('active'))renderExercises(workouts[currentWorkout]);
  gcCopy();
  if(document.getElementById('historyScreen').classList.contains('active'))loadHistory();
  if(document.getElementById('statsScreen').classList.contains('active'))loadStats();
 });
 matchMedia('(max-width:800px)').addEventListener('change',gcCopy);
 gcOnScreen('mainScreen');
});
