'use strict';

export const getAgents = state => state.agents
  .valueSeq()
  .sortBy(agent => agent.agentId);
