<script lang="ts">
  import { Epoch, TimedEvent, TimeLine } from "unix-ts";

  const initTime = 1577836800; // UTC 1 Jan 2020

  const randEvent = (): TimedEvent => {
    let ev = Array(2, 0)
      .map(() => {
        return initTime + Math.floor(Math.random() * 500_000_000);
      })
      .sort();

    return new TimedEvent(...ev, {
      sortIndex: null,
    });
  };

  let ev0 = new TimedEvent(initTime, initTime + 3_000, { sortIndex: 0 });
  let ev1 = new TimedEvent(initTime + 100_000, initTime + 120_000, {
    sortIndex: 3,
  });
  let ev2 = new TimedEvent(initTime + 10_000, initTime + 23_000, {
    sortIndex: 1,
  });
  let ev3 = new TimedEvent(initTime + 12_000, initTime + 13_000, {
    sortIndex: 2,
  });

  let tl: TimeLine = new TimeLine([ev0, ev1, ev2, ev3]);

  let exampleFuncs = {
    "Sort Start Asc": (): void => {
      tl.sort();
      tl = tl;
    },

    "Sort Start Desc": (): void => {
      tl.sort(false);
      tl = tl;
    },

    "Sort End Asc": (): void => {
      tl.sort(true, "end");
      tl = tl;
    },

    "Sort End Desc": (): void => {
      tl.sort(false, "end");
      tl = tl;
    },

    "Sort Duration Asc": (): void => {
      tl.sort(true, "duration");
      tl = tl;
    },

    "Sort Duration Desc": (): void => {
      tl.sort(false, "duration");
      tl = tl;
    },

    "LPush Rand": () => {
      console.log("Left Push");
      tl.push(randEvent(), "left");
      tl = tl;
    },

    "RPush Rand": (): void => {
      console.log("Right Push");
      tl.push(randEvent(), "right");
      tl = tl;
    },

    "Insert Rand": (): void => {
      console.log("Insert");
      tl.insert(randEvent());
      tl = tl;
    },
  };
</script>

<div
  class="w-full grid grid-cols-8 gap-2 align-middle justify-around px-10 p-4"
>
  {#each Object.entries(exampleFuncs) as [name, func]}
    <button
      on:click={func}
      class="text-slate-900 z-50 bg-slate-300 rounded-md p-2 mx-2"
      >{name}</button
    >
  {/each}
</div>

<div class="w-full grid grid-cols-4 align-middle justify-around px-10">
  {#each tl.events as ev}
    <div class="text-center">
      <svg
        viewBox="0 0 100 100"
        width="95%"
        height="95%"
        xmlns="http://www.w3.org/2000/svg"
      >
        <circle fill="green" cx="50" cy="50" r="50" />
        <text x="4" y="45" fill="white" class="text-[0.32rem]"
          >Start: {ev.start.date().toISOString()}</text
        >
        <text x="4" y="55" fill="white" class="text-[0.32rem]"
          >End: {ev.end.date().toISOString()}</text
        >

        <text x="4" y="65" fill="white" class="text-[0.32rem]"
          >Duration: {ev.duration()} s</text
        >
      </svg>
    </div>
  {/each}
</div>
