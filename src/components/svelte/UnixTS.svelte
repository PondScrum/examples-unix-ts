<script lang="ts">
    import { Epoch, TimedEvent, TimeLine } from "unix-ts";

  
    const initTime = 1577836800 // UTC 1 Jan 2020

    const randEvent = (): TimedEvent=>{
        let ev = Array(2, 0).map(()=>{return initTime + Math.floor(Math.random() * 5_000)}).sort();
        
        return new TimedEvent(...ev, {
            sortIndex: 0.5
        });
    }

    
    let ev0 = new TimedEvent(initTime, initTime + 3_000, {sortIndex: 0});
    let ev1 = new TimedEvent(initTime + 100_000, initTime + 120_000, {sortIndex: 3});
    let ev2 = new TimedEvent(initTime + 10_000, initTime + 23_000, {sortIndex: 1});
    let ev3 = new TimedEvent(initTime + 12_000, initTime + 13_000, {sortIndex: 2});


    let tl: TimeLine = new TimeLine([ev0, ev1, ev2, ev3]);

    let exampleFuncs = {
        "Sort Asc": ():void=>{
            console.log("Sort ASC");
            tl.sort();
            tl = tl;
        },

        "Sort Desc": ():void=>{
            console.log("Sort DESC");
            tl.sort(false);
            tl = tl;
        },

        "LPush": ()=>{
            console.log("Left Push");
            tl.events.unshift(randEvent());
            tl = tl;
        },

        "RPush": ():void=>{
            console.log("Right Push");
            tl.events.push(randEvent());
            tl = tl;
        }
    }

</script>

<div class="w-full flex flex-row align-middle justify-around px-10">
    {#each Object.entries(exampleFuncs) as [name, func]}
        <button on:click={func} class="text-slate-300 z-50">{name}</button>
    {/each}
</div>

<div class="w-full flex flex-row align-middle justify-around px-10">
    {#each tl.events as ev }
    <div class="text-center">
    <svg  viewBox="0 0 100 100" width="50%" height="50%" xmlns="http://www.w3.org/2000/svg">
        <circle fill="green" cx="50" cy="50" r="50" />
        <text x="46" y="52" fill="white" class="small">{ev.metaData.sortIndex}</text>
      </svg>
        <p class="text-slate-300 text-center text-sm">
            Start: {ev.start.date()}
            <br>
            End: {ev.end.date()}
        </p>
    </div>
    {/each}
</div>