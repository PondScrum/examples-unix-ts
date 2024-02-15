<script lang="ts">
    import { Epoch, TimedEvent, TimeLine } from "unix-ts";

  
    const initTime = 1577836800 // UTC 1 Jan 2020

    const randEvent = (): TimedEvent=>{
        let ev = Array(2).map(()=>{return initTime + Math.floor(Math.random() * 5_000)}).sort();
        return new TimedEvent(...ev, {
            sortIndex: null
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
            tl.push(randEvent(), "left");
            tl = tl;
        },

        "RPush": ():void=>{
            console.log("Right Push");
            tl.push(randEvent(), "right");
            tl = tl;
        }
    }

</script>

<div class="w-full flex flex-row align-middle justify-around px-10">
    {#each Object.entries(exampleFuncs) as [name, func]}
        <button class="text-slate-300 z-50" on:click={func}>{name}</button>
    {/each}
</div>

<div class="w-full flex flex-row align-middle justify-around px-10">
    {#each tl.events as ev }
        <p class="text-slate-300">
            Start: {ev.start.date()}
            <br>
            End: {ev.end.date()}
            <br>
            Sort Index: {ev.metaData.sortIndex}
        </p>
    {/each}
</div>