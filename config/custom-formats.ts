// Note: This is the list of formats
// The rules that formats use are stored in data/rulesets.ts
/*
If you want to add custom formats, create a file in this folder named: "custom-formats.ts"

Paste the following code into the file and add your desired formats and their sections between the brackets:
--------------------------------------------------------------------------------
// Note: This is the list of formats
// The rules that formats use are stored in data/rulesets.ts

export const Formats: FormatList = [
];
--------------------------------------------------------------------------------

If you specify a section that already exists, your format will be added to the bottom of that section.
New sections will be added to the bottom of the specified column.
The column value will be ignored for repeat sections.
*/

export const Formats: FormatList = [
	{
		name: "[Gen 1] BH",
		
		mod: 'gen1',
		ruleset:['OHKO Clause', 'Evasion Moves Clause', 'Freeze Clause Mod', 'Sleep Clause Mod'],
		banlist: ['Dig','Fly'],
		restricted: ['Spore', 'move:Sleep Powder','Lovely Kiss','move:Hypnosis','move:Wrap','move:Fire Spin','move:Clamp','move:Bind', 'Sing'],
		onValidateTeam(team, format, teamHas){
			return [];
		},
		onValidateSet(set){
			const dex = this.dex;
			const problems = [];
			const species = dex.species.get(set.species);
			for (const [i,moveid] of set.moves.entries()){
				const move = this.dex.moves.get(moveid);
				if (this.ruleTable.isRestricted(`move:${move.id}`)) {
					const learnset1 =  dex.forGen(1).data.Learnsets[species.id].learnset;
					let learnsMove = false;
					for (const move1 in learnset1){
						if (move1 == moveid.toLowerCase().split(' ').join('')){
							learnsMove = true;
							if (move1 == 'lovelykiss' && species.baseSpecies != 'Jynx'){
								learnsMove = false;
							}
						}
					}
					if (!learnsMove){
						problems.push(`${species.name} cannot use ${move.name} because ${move.name} is restricted and ${species.name} does not naturally learn ${move.name}.`);
					}
				}
			}
			return problems;
		}
	},
	{
		name: "[Gen 1] RBYTera",
		
		mod: 'gen1',
		ruleset:['[Gen 1] OU'],
		onValidateTeam(team, format, teamHas){
			return [];
		},
		onValidateSet(set){
		}
	},
];
