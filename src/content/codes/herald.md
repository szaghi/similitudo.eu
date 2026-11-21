---
name: HERALD
tagline: The MPI handler of HPC codes, one object that knows where the program runs and speaks for its ranks.
kind: general
order: 21
status: active
license: GPLv3 / BSD / MIT
repo: https://github.com/szaghi/HERALD
docs: https://szaghi.github.io/HERALD/
logo: /codes/herald
methods:
  - The communicator, the rank and the ranks of the run and of the node, initialized once whoever asks first
  - An error on one rank stops every rank, with its message and exit status 1
  - Named timers reduced over the ranks, minimum, mean, maximum and load imbalance, as a table or as CSV
  - The memory budget of a rank, from the node's memory or the job's cgroup limit, checked before an allocation
  - Messages prefixed with the rank
  - Ranks bound to the devices of their node, on OpenACC or OpenMP
  - No dependencies beyond MPI; without MPI, a single-rank library with the same interface
---

**HERALD** (*H*PC *E*nvironment, *R*anks, *A*ccounting, *L*ogging, *D*evices) is a modern Fortran library with one
type, `mpih_object`, that holds what a parallel code needs to know about where it runs: its ranks and their node
topology, named timers reduced over the ranks, the memory budget of each rank, a fatal path that stops the whole run
instead of leaving the other ranks waiting in a collective, and the binding of ranks to devices.

It replaces the `mpih_object` classes that ADAM and FUNDAL each carried. It is tested with gfortran, nvfortran and ifx;
its device layer has run on NVIDIA GPUs with OpenACC and with OpenMP.
