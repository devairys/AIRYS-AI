import React from 'react'

import ToolCard from '../tool-card';

import type { ToolInvocation } from 'ai';
import type { AllBalancesResultType } from '@/ai';

interface Props {
    tool: ToolInvocation
}

const AllBalances: React.FC<Props> = ({ tool }) => {
    

    return (
        <ToolCard 
            tool={tool}
            agentName="Wallet Agent"
            icon="Wallet"
            loadingText={`Getting All Balances...`}
            resultHeading={() => `Fetched All Balances`}
            resultBody={(result: AllBalancesResultType) => result.body 
                ? (
                    <div className="flex flex-col gap-2">
                        {result.body.balances.map((balance) => (
                            <div className="flex flex-row items-center gap-2" key={balance.token}>
                                <img src={balance.logoURI} alt={balance.name} className="w-8 h-8 rounded-full" />
                                <p>{balance.balance.toFixed(4)} {balance.name} ({balance.token})</p>
                            </div>
                        ))}
                    </div>
                )
                :  "No balance found"}
        />
    )
}

export default AllBalances;